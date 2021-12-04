import * as assert from 'assert'
import { VotingApi, VochainWaiter } from '@vocdoni/voting'
import { GatewayPool } from '@vocdoni/client'

export async function checkVoteResults(processId: string, gwPool: GatewayPool) {
    assert.strictEqual(typeof processId, "string")

    console.log("Waiting a bit for the votes to be received", processId)
    const nextBlock = 2 + await VotingApi.getBlockHeight(gwPool)
    await VochainWaiter.waitUntil(nextBlock, gwPool, { verbose: true })

    console.log("Fetching the number of votes for", processId)
    const envelopeHeight = await VotingApi.getEnvelopeHeight(processId, gwPool)
    console.log('Votes submitted: ' + envelopeHeight)

    const processState = await VotingApi.getProcessState(processId, gwPool)

    console.log("Waiting for the process to end", processId)
    await VochainWaiter.waitUntil(processState.endBlock, gwPool, { verbose: true })

    console.log("Waiting a bit for the results to be ready", processId)
    await VochainWaiter.wait(2, gwPool, { verbose: true })

    console.log("Fetching the vote results for", processId)
    const rawResults = await VotingApi.getResults(processId, gwPool)
    const totalVotes = await VotingApi.getEnvelopeHeight(processId, gwPool)

    console.log('Raw voting results: ' + rawResults)
    console.log('Total votes: ' + totalVotes)
}