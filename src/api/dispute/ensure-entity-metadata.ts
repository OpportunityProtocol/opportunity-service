import { GatewayPool } from '@vocdoni/client'
import { EntityMetadataTemplate } from '@vocdoni/data-models'
import { EntityApi } from '@vocdoni/voting'
import { Wallet } from 'ethers'
import * as assert from 'assert'

export async function ensureEntityMetadata(creatorWallet: Wallet, gwPool: GatewayPool) {
    console.log("Making sure metadata doesn't already exist...")
    const meta = await EntityApi.getMetadata(creatorWallet.address, gwPool).catch(err => console.log(err))
    if (!meta) return false

    console.log("Setting Metadata for entity", creatorWallet.address)
    const metadata = JSON.parse(JSON.stringify(EntityMetadataTemplate))

    metadata.name = { default: "Opportunity" }
    metadata.description = { default: "Opportunity, decentralized job markets" }
    metadata.media = {
        avatar: "https://picsum.photos/200/300",
        header: "Opportunity, decentralized job markets",
        logo: "https://picsum.photos/200/300"
    }

    await EntityApi.setMetadata(creatorWallet.address, metadata, creatorWallet, gwPool)
    console.log('Entity metadata set')

    // Read back
    const entityMetaPost = await EntityApi.getMetadata(creatorWallet.address, gwPool)
    if (!entityMetaPost) return false

    assert.strictEqual(entityMetaPost.name.default, metadata.name.default)
    assert.strictEqual(entityMetaPost.description.default, metadata.description.default)

    return true
}