import { VotingApi, VochainWaiter, ProcessState } from '@vocdoni/voting'
import * as assert from 'assert'
import { ProcessStatus } from 'dvote-solidity'

export async function waitUntilPresent(processId, gwPool) {
    let attempts = 10
    while (attempts >= 0) {
        console.log("Waiting for process", processId, "to be created")
        await VochainWaiter.wait(1, gwPool)

        const state: ProcessState | void = await VotingApi.getProcessState(processId, gwPool).catch(error => console.log(error))
        console.log('Attempted to get process state: ' + state)
        if (state?.entityId) break

        attempts--
    }

    if (attempts < 0) throw new Error("The process still does not exist on the Vochain after 10 blocks")
}