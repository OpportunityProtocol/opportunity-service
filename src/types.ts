import {
  ExchangeEvents,
  MarketEvents,
  StorageProviders,
  UserEvents,
} from './constants'

export type IHashMap = {}

export type StorageInterface = {
  currentProvider: StorageProviderInterface
  changeStorageProvider: (provider: StorageProviderInterface) => any
  getCurrentProvider: () => StorageProviders
}

export interface StorageProviderInterface {
  createProvider: () => any
  storeData: (data: object) => any
  retrieveData: (storageLocation: string) => any
}

export type SubscriptionParameter = {
  address: string
  topics: Array<string>
  subscription_type: MarketEvents | UserEvents | ExchangeEvents
}

export type ParamObject = {
  from: string
  to: string
  gasLimit: string
  gasPrice: string
  nonce: string
  value: string
  data: string
}

export type FilterParams = {
  fromBlock: string | number
  toBlock: string | number
  address: string
}

export type WorkRelationshipMetadata = {
  solution: any
  attachments: Array<string>
  definitionOfDone: string
  desiredDuration: string
  description: string
}

export interface EventCallbackDictionary {
  [eventName: string]: () => any
}
