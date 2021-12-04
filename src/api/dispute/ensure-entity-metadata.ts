import { EntityApi } from "vocdoni/voting"

export async function ensureEntityMetadata(creatorWallet, gwPool) {
    const meta = await EntityApi.getMetadata(entityWallet.address, gwPool).catch(err => console.log(err))
    if (!meta) return false

    console.log("Setting Metadata for entity", entityWallet.address)

    const metadata = JSON.parse(JSON.stringify(EntityMetadataTemplate))
console.log('meta')
    metadata.name = { default: "Test Organization Name" }
    metadata.description = { default: "Description of the test organization goes here" }
    metadata.media = {
        avatar: "www.google.com/hi",
        header: "Hello",
        logo: "logo"
    }
    console.log('set')

    await EntityApi.setMetadata(entityWallet.address, metadata, entityWallet, gwPool)
    console.log("Metadata updated")

    // Read back
    const entityMetaPost = await EntityApi.getMetadata(entityWallet.address, gwPool)

    //assert(entityMetaPost)
    //assert.strictEqual(entityMetaPost.name.default, metadata.name.default)
    //assert.strictEqual(entityMetaPost.description.default, metadata.description.default)

    return entityMetaPost
}