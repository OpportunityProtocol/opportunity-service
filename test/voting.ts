import 'mocha' // using @types/mocha
import { expect } from "chai"

import { connect } from '../src/api/voting/connect'

const ethNetworkId = 'mainnet'
const environment = 'dev'
const bootnodesContentUri = 'ipfs://1234'



describe("Setting up a process", () => {

    it("Should connect gateways", async () => {
        expect(connect(ethNetworkId, environment, bootnodesContentUri))
    }).timeout(20000)

})
