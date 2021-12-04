import { Wallet } from "@ethersproject/wallet"
import { CensusErc20Api } from "@vocdoni/census"
import { ProcessState, VotingApi, VotingOracleApi } from "@vocdoni/voting"
import { DVoteGateway, Erc20TokensApi, GatewayPool } from "@vocdoni/client"
import { ProcessMetadataTemplate } from "@vocdoni/data-models"
import { ProcessMode, ProcessContractParameters, ProcessEnvelopeType } from '@vocdoni/contract-wrappers'
import * as assert from 'assert'
import { waitUntilPresent } from "./util/wait-until-present"

export async function launchNewVote(
    creatorWallet: Wallet, 
    tokenAddress: string, 
    gwPool: GatewayPool, 
    oracleClient: DVoteGateway,
    disputeId: string,
    employer: string,
    worker: string
    ) {
    console.log('Launching new vote...')

    if (!await Erc20TokensApi.isRegistered(tokenAddress, gwPool)) {
        await CensusErc20Api.registerTokenAuto(
            tokenAddress,
            creatorWallet,
            gwPool
        )

        assert(await Erc20TokensApi.isRegistered(tokenAddress, gwPool))
    }

    const sourceBlockHeight = (await gwPool.provider.getBlockNumber()) - 1
    const tokenInfo = await CensusErc20Api.getTokenInfo(tokenAddress, gwPool)
    const proof = await CensusErc20Api.generateProof(tokenAddress, creatorWallet.address, tokenInfo.balanceMappingPosition, sourceBlockHeight, gwPool.provider)
    
    if (!proof?.storageProof?.length) throw new Error("Invalid storage proof")

    console.log("Preparing the new vote metadata")
    const processMetadataPre = JSON.parse(JSON.stringify(ProcessMetadataTemplate)) // make a copy of the template
    processMetadataPre.title.default = disputeId,
    processMetadataPre.description.default = `Dispute: ${disputeId}`,
    processMetadataPre.questions = [
        {
            title: { default: "Contract Dispute" },
            description: { default: "Please choose one of the two participants" },
            choices: [
                { title: { default: employer }, value: 0 },
                { title: { default: worker }, value: 1 },
            ]
        }
    ]
    processMetadataPre.meta.disputeId = disputeId;

    const maxValue = processMetadataPre.questions.reduce((prev, cur) => {
        const localMax = cur.choices.reduce((prev, cur) => prev > cur.value ? prev : cur.value, 0)
        return localMax > prev ? localMax : prev
    }, 0)

    console.log("Getting the block height")
    const currentBlock = await VotingApi.getBlockHeight(gwPool)
    const startBlock = currentBlock + 15 //start after 15 blocks
    const blockCount = 6 * 4 // 4m

    const processParamsPre = {
        mode: ProcessMode.make({ autoStart: true }),
        envelopeType: ProcessEnvelopeType.make({}), // bit mask
        metadata: processMetadataPre,
        startBlock,
        blockCount,
        maxCount: 1,
        maxValue,
        maxTotalCost: 0,
        costExponent: 10000,  // 1.0000
        maxVoteOverwrites: 1,
        sourceBlockHeight,
        tokenAddress,
        paramsSignature: "0x0000000000000000000000000000000000000000000000000000000000000000"
    }

    const tokenDetails = {
        balanceMappingPosition: tokenInfo.balanceMappingPosition,
        storageHash: proof.storageHash,
        storageProof: {
            key: proof.storageProof[0].key,
            value: proof.storageProof[0].value,
            proof: proof.storageProof[0].proof
        }
    }

    console.log("Creating the process")
    const processId = await VotingOracleApi.newProcessErc20(
        processParamsPre, 
        tokenDetails, 
        creatorWallet, 
        gwPool, 
        oracleClient
    )

    assert(processId)
    console.log("Created process with process id: ", processId)

    await waitUntilPresent(processId, gwPool)

    console.log('Checking process params to ensure process was created...')
    const processParams: ProcessState = await VotingApi.getProcessState(processId, gwPool)

    assert.strictEqual(processParams?.entityAddress.toLowerCase(), creatorWallet.address.toLowerCase())
    assert.strictEqual(processParams?.startBlock, processParamsPre?.startBlock, "SENT " + JSON.stringify(processParamsPre) + " GOT " + JSON.stringify(processParams))
    assert.strictEqual(processParams?.blockCount, processParamsPre?.blockCount)
    assert.strictEqual(processParams?.censusUri, processParamsPre?.censusUri)

    const processMetadata = await VotingApi.getProcessMetadata(processId, gwPool)
    console.log('Process created with metadata: ')
    console.log(processMetadata)

    return { processId, processParams, processMetadata }
}