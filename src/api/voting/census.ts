import { providers } from "ethers"
import { CensusOffChainApi, CensusOffChain } from 'dvote-js'

import gwPool from "./connect"

let merkleTreeOrigin: string
let merkleRoot: string


async function publishVoteCensus(
    censusName: string, 
    entityWallet: providers.JsonRpcSigner, 
    adminPubKey: string, 
    accountsToPublicKeys: Array<{ address: string, pubKey: string }>
    ) {
    // Prepare the census parameters
    const adminPublicKeys = [adminPubKey]
    const publicKeyClaims : { key: string, value: string }[] = accountsToPublicKeys.map(account => {
        const hashedAddress = CensusOffChain.Anonymous.digestPublicKey(BigInt(account.pubKey), BigInt(account.pubKey))
        const value = ""
        return { key: hashedAddress, value }
    }) // hash the keys

    // As the census does not exist yet, we create it (optional when it exists)
    let { censusId } = await CensusOffChainApi.addCensus(censusName, adminPublicKeys, gwPool, entityWallet)
    console.log(`Census added: "${censusName}" with ID ${censusId}`)

    // Add claims to the new census
    let result = await CensusOffChainApi.addClaimBulk(censusId, publicKeyClaims, true, gwPool, entityWallet)
    console.log("Added", accountsToPublicKeys.length, "claims to", censusId)
    if (result.invalidClaims.length > 0) console.error("Invalid claims", result.invalidClaims)

    merkleRoot = await CensusOffChainApi.getRoot(censusId, gwPool)
    console.log("Census Merkle Root", merkleRoot)

    // Make it available publicly
    merkleTreeOrigin = await CensusOffChainApi.publishCensus(censusId, gwPool, entityWallet)
    console.log("Census published on", merkleTreeOrigin)
}