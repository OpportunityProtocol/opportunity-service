import { 
    GatewayPool, 
    IGatewayDiscoveryParameters, 
    EthNetworkID,
    VocdoniEnvironment
 } from "dvote-js"

let gwPool : GatewayPool  = null

export async function connectGateways(
    ethNetworkId: EthNetworkID, 
    environment: VocdoniEnvironment,
    bootnodesContentUri: string
    ) {
    console.log("Connecting to the gateways")

        //gateway options
        const options: IGatewayDiscoveryParameters = {
            networkId: ethNetworkId,
            environment,
            bootnodesContentUri,
            numberOfGateways: 2,
            // timeout: 10000,
        }
    
       const pool = await GatewayPool.discover(options)
       return pool
}

async function disconnectGateways() {
    gwPool.disconnect()
}

export default gwPool