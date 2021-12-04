import { VotingApi, VochainWaiter } from '@vocdoni/voting'
import * as assert from 'assert'
import { ProcessStatus } from 'dvote-solidity'

export async function waitUntilStarted(processId, startBlock, gwPool) {
    console.log('Waiting until block: ' + startBlock)

    // start block
    await VochainWaiter.waitUntil(startBlock, gwPool, { verbose: true })

    console.log("Waiting for the process to be ready")
    const state = await VotingApi.getProcessState(processId, gwPool)
    assert.strictEqual(state.status, ProcessStatus.READY, "Should be ready but is not")
}