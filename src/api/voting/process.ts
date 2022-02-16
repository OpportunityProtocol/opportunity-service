import * as assert from 'assert'
import {
  ProcessMetadata,
  VochainWaiter,
  CensusOffChainApi,
  EntityApi,
  ProcessMetadataTemplate,
  INewProcessParams,
  ProcessMode,
  VotingApi,
  ProcessEnvelopeType,
  ProcessCensusOrigin,
  Voting,
} from 'dvote-js'
import { providers } from 'ethers'
import gwPool from './connect'

import { CensusOffChain } from 'dvote-js/dist/api/census'
import opportunityService from '../../OpportunityService'

/**
 * As it happened before, the JSON metadata is pinned on IPFS and pointed to from the process smart contract. In addition, some metadata fields are also stored on the smart contract so they can be accessed on-chain.
 * The contract flags define how the process will behave, whereas the metadata is used to store the human readable content.
 * In about 2-3 minutes, the Ethereum transaction will be relayed to the voting blockchain as well. When the block number reaches startBlock, the process will become open to those who are part of the census. The startBlock value should be at least 25 blocks ahead of the current value.
 *
 * @param censusRoot
 * @param censusUri
 * @param details
 * @param entityWallet
 */
export async function createVotingProcess(
  censusRoot,
  censusUri,
  details: ProcessMetadata,
  entityWallet: providers.JsonRpcSigner,
) {
  console.log('Preparing the new vote metadata')
  console.log('Getting the block height')
  const currentBlock = await VotingApi.getBlockHeight(gwPool)
  const startBlock = currentBlock + 25
  const blockCount = 60480

  const processParamsPre: INewProcessParams = {
    mode: ProcessMode.make({ autoStart: true, interruptible: true }), // helper
    envelopeType: ProcessEnvelopeType.ENCRYPTED_VOTES, // bit mask
    censusOrigin: ProcessCensusOrigin.OFF_CHAIN_TREE,
    metadata: details,
    censusRoot: censusRoot,
    censusUri: censusUri,
    startBlock,
    blockCount,
    maxCount: 1,
    maxValue: 3,
    maxTotalCost: 0,
    costExponent: 10000,
    maxVoteOverwrites: 1,
    paramsSignature:
      '0x0000000000000000000000000000000000000000000000000000000000000000',
  }

  console.log('Creating the process')

  const processId = await VotingApi.newProcess(
    processParamsPre,
    entityWallet,
    gwPool,
  )
  //assert(processId)

  //processMetadata = processParamsPre.metadata

  // Reading back
  //processParams = await VotingApi.getProcessContractParameters(processId, gwPool)
  //assert.strictEqual(processParams.entityAddress.toLowerCase(), entityAddr.toLowerCase())
  //assert.strictEqual(processParams.startBlock, processParamsPre.startBlock, "SENT " + JSON.stringify(processParamsPre) + " GOT " + JSON.stringify(processParams))
  //assert.strictEqual(processParams.blockCount, processParamsPre.blockCount)
  //assert.strictEqual(processParams.censusRoot, processParamsPre.censusRoot)
  //assert.strictEqual(processParams.censusUri, processParamsPre.censusUri)
}

async function vote(processId, choices, publicKey) {
  // Fetch the metadata
  const processMeta = await VotingApi.getProcessMetadata(processId, gwPool)
  const processParams = await VotingApi.getProcessContractParameters(
    processId,
    gwPool,
  )

  console.log(
    '- Starting:',
    await VotingApi.estimateDateAtBlock(processMeta.startBlock, gwPool),
  )
  console.log(
    '- Ending:',
    await VotingApi.estimateDateAtBlock(
      processMeta.startBlock + processMeta.numberOfBlocks,
      gwPool,
    ),
  )
  console.log(
    '- Census size:',
    await CensusOffChainApi.getSize(processMeta.census.merkleRoot, gwPool),
  )
  console.log('- Current block:', await VotingApi.getBlockHeight(gwPool))
  console.log(
    '- Current votes:',
    await VotingApi.getEnvelopeHeight(processId, gwPool),
  )

  await VochainWaiter.waitUntil(processParams.startBlock, gwPool, {
    verbose: true,
  })
  //await waitUntilVochainBlock(processMeta.startBlock, gwPool, { verbose: true })

  console.log('Submitting vote envelopes')

  // Hash the voter's public key
  const publicKeyHash = CensusOffChain.Public.encodePublicKey(publicKey) //supposed to be digestPublicKey(x, y)?

  // Generate the census proof
  const merkleProof = await CensusOffChainApi.generateProof(
    processParams.censusRoot,
    { key: Buffer.from(String(publicKey), 'hex').toString('base64'), value: 0 },
    true,
    gwPool,
  )

  // Sign the vote envelope with our choices
  const voteEnvelope = await VotingApi.packageSignedEnvelope({
    votes: choices,
    censusOrigin: 0,
    censusProof: merkleProof,
    processLeys: processId,
    walletOrSigner: opportunityService.getSignersInterface(),
  })

  // If the process had encrypted votes:
  // const voteEnvelope = await packagePollEnvelope({ votes, merkleProof, processId, walletOrSigner: wallet, encryptionPubKeys: ["..."] })

  await VotingApi.submitEnvelope(
    voteEnvelope,
    opportunityService.getSignersInterface(),
    gwPool,
  )
  console.log('Envelope submitted')
}

/*
async function checkVoteStatus() {
    // Compute our deterministic nullifier to check the status of our vote
    const nullifier = await getPollNullifier(wallet.address, processId)
    const status = await VotingApi.getEnvelopeStatus(processId, nullifier, pool)

    console.log("- Registered: ", status.registered)
    console.log("- Block: ", status.block)
    console.log("- Date: ", status.date)
}*/

async function fetchResults(processId) {
  const { results, status } = await VotingApi.getResults(processId, gwPool)
  console.log('Process results', results)
}
