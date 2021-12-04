import { GatewayPool, IGatewayDiscoveryParameters, DVoteGateway } from "@vocdoni/client"
import { EthNetworkID } from "@vocdoni/common"
import { VocdoniEnvironment } from "dvote-js"

export async function connectGateways(networkId: EthNetworkID, environment: VocdoniEnvironment, bootnodeContentUri: string){
    console.log("Connecting to the gateways")
    
    const options: IGatewayDiscoveryParameters  = {
        networkId: networkId,
        environment: environment,
        bootnodesContentUri: bootnodeContentUri
    }

    const pool = await  GatewayPool.discover(options)

    console.log("Connected to", pool.dvoteUri)
    console.log("Connected to", pool.provider["connection"].url)

    return pool
}

export async function getOracleClient() {
    console.log('Creating oracle instance...')
    const oracleClient = new DVoteGateway({
        uri: 'https://signaling-oracle.dev.vocdoni.net/dvote',
        supportedApis: ["oracle"]
    })

    console.log('Initiating oracle...')
    await oracleClient.init()

    console.log('Oracle status: ' + oracleClient.isReady)
    console.log('Oracle health: ' + oracleClient.health)
    
    return oracleClient
}