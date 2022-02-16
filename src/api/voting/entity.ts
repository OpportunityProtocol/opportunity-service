import {
  EntityMetadata,
  EntityApi,
  EntityMetadataTemplate,
  GatewayPool,
} from 'dvote-js'
import { providers } from 'ethers'
import gwPool from './connect'

/**
 * Vocdoni Docs:
 * We created JSON metadata containing the custom details of our entity
 * We pinned the JSON content on IPFS using a gateway from the pool
 * The hash of our metadata is QmdK5TnHDXPt4xozkuboyKP94RTrUxFr1z9Pkv5qhfahFG and should be available from any IPFS peer (opens new window)
 * An Ethereum transaction was sent to the entities contract, defining the pointer to our new metadata.
 * The value on the smart contract can only be updated by our wallet, the blockchain ensures the integrity of our data and IPFS ensures its global availability.
 *
 * @param entity
 * @param entityAppData
 */
export async function registerEntity(pool: GatewayPool, entity, address) {
  // Make a copy of the metadata template and customize it

  const entityMetadata: EntityMetadata = Object.assign(
    {},
    EntityMetadataTemplate,
  )

  entityMetadata.name.default = 'App'
  entityMetadata.description.default = 'App'
  /*entityMetadata.media = {
    avatar: 'https://my-organization.org/logo.png',
    header: 'https://my-organization.org/header.jpeg'
}*/
  entityMetadata.actions = []

  const contentUri = await EntityApi.setMetadata(
    address,
    entityMetadata,
    entity,
    pool,
  )
  // Show stored values
  console.log('The entity has been defined')
  console.log(contentUri)
}
