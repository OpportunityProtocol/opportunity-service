import { ExchangeEvents, MarketEvents, StorageProviders, UserEvents } from "./constants";

/* General Types */
export type IHashMap = {}

/* Storage Module */
export type StorageInterface = {
    currentProvider: StorageProviderInterface,
    changeStorageProvider: (provider : StorageProviderInterface) => any,
    getCurrentProvider: () => StorageProviders,
}

export interface StorageProviderInterface {
    createProvider: () => any,
    storeData: (data : object) => any,
    retrieveData: (storageLocation : string) => any
}

export type SubscriptionParameter = {
    address: string,
    topics: Array<string>,
    subscription_type: MarketEvents | UserEvents | ExchangeEvents
}

/* Web3 */

export type ParamObject = {
    from: string,
    to: string,
    gasLimit: string,
    gasPrice: string,
    nonce: string,
    value: string,
    data: string,
}

export type FilterParams = {
    fromBlock: string | number,
    toBlock: string | number,
    address: string
}

/* Contracts */

export type WorkRelationshipMetadata = {
    solution: any,
    attachments: Array<string>,
    definitionOfDone: string,
    desiredDuration: string,
    description: string,
}

export interface EventCallbackDictionary { [eventName : string]: () => any }