

import { ethers } from "dvote-js/node_modules/ethers"
import gwPool, { connectGateways } from "../src/api/voting/connect"
import { registerEntity } from '../src/api/voting/entity'

const ethNetworkId = 'rinkeby'
const environment = 'dev'
const bootnodesContentUri = "https://bootnodes.vocdoni.net/gateways.dev.json"

describe("Setting up a process", () => {
    it("Should connect gateways", async () => {
        expect(async () => await connectGateways(ethNetworkId, environment, bootnodesContentUri)).not.toThrow()
        const pool = await connectGateways(ethNetworkId, environment, bootnodesContentUri)
        console.log(pool)
        const wallet = ethers.Wallet.createRandom().connect(pool['provider'])
        const address = await wallet.getAddress()
        expect(() => registerEntity(pool, wallet, address)).not.toThrow()
    })
})
