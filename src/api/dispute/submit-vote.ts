import { Wallet } from "@ethersproject/wallet"
import { CensusErc20Api } from "@vocdoni/census"
import { ProcessState, VotingApi, VotingOracleApi } from "@vocdoni/voting"
import { DVoteGateway, Erc20TokensApi, GatewayPool } from "@vocdoni/client"
import { ProcessMetadata } from "@vocdoni/data-models"
import { Signer } from "@ethersproject/abstract-signer"
import { JsonRpcProvider } from "@ethersproject/providers"
import { assert } from "console"

export async function submitVote(
    processId: string, 
    processParams: ProcessState, 
    processMetadata: ProcessMetadata, 
    accounts, 
    tokenAddress: string,
    voter: Signer,
    voterChoice: number[],
    gwPool: GatewayPool) {
    console.log("Launching votes")

    const processKeys = processParams.envelopeType.hasEncryptedVotes ? await VotingApi.getProcessKeys(processId, gwPool) : null
    const balanceMappingPosition = (await CensusErc20Api.getTokenInfo(tokenAddress, gwPool)).balanceMappingPosition
    const voterAddress = await voter.getAddress()

    const result = await CensusErc20Api.generateProof(
        tokenAddress, 
        voterAddress, 
        balanceMappingPosition, 
        processParams.sourceBlockHeight, 
        gwPool.provider as JsonRpcProvider
    )

    const censusProof = result.storageProof[0]

    console.log('Creating voter envelope')
    const envelope = processParams.envelopeType.encryptedVotes ?
    await VotingApi.packageSignedEnvelope({ censusOrigin: processParams.censusOrigin, votes: voterChoice, censusProof, processId, walletOrSigner: voter, processKeys }) :
    await VotingApi.packageSignedEnvelope({ censusOrigin: processParams.censusOrigin, votes: voterChoice, censusProof, processId, walletOrSigner: voter })

    console.log('Attempting to submit voter envelope: ' + voter)
    await VotingApi.submitEnvelope(envelope, voter, gwPool)

    // wait a bit
    await new Promise(resolve => setTimeout(resolve, 11000))

    const nullifier = VotingApi.getSignedVoteNullifier(voterAddress, processId)
    const { block, date, registered } = await VotingApi.getEnvelopeStatus(processId, nullifier, gwPool)

    if (!registered) {
        console.log('Vote not submitted.. voter not registered...')
        return false;
    }

    console.log('Voter envelope successfully submitted')
    console.log('Block: ' + block)
    console.log('Date: ' + date)
    console.log('Registered: ' + registered)
    return true
}