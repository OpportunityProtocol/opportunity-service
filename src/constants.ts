require('dotenv').config()

/* Contracts */
export const ABI_LIST = [
  'MarketFactory',
  'WorkRelationship',
  'Market'
]

export enum Contracts {
  CONTROL='Control',
  DISPUTE='Dispute',
  WORK_EXCHANGE='WorkExchange',
  WORK_RELATIONSHIP='WorkRelationship',
  MARKET='Market',
  MARKET_FACTORY='MarketFactory',
  EVALUATION='Evaluation',
  MARKETLIB='MarketLib',
  STRINGUTILS='StringUtils'
}

export const enum WorkRelationshipState {
  UNCLAIMED,
  PENDING,
  PENDING_DISPUTE,
  CANCELLED,
  COMPLETED,
  EVALUATING,
  CLAIMED,
}


/* Web3 */

export const enum Networks {
  Ropsten = 'Ropsten',
  Mainnet = 'Mainnet',
  Rinkeby = 'Rinkeby'
}

export const RPC_CONFIGURATION = {
  httpAddresses: ['https://silent-bold-sea.rinkeby.quiknode.pro/1dbc05d5626c99bd2ad24ada0c962fc90f15b007/'], // optional, default empty array
  wsAddresses: ['wss://silent-bold-sea.rinkeby.quiknode.pro/1dbc05d5626c99bd2ad24ada0c962fc90f15b007/'], // optional, default empty array
  networkID: 3, // optional, used to verify connection to the intended network (blockchain)
  connectionTimeout: 3000, // optional, default 3000
  errorHandler: function (err) { /* out-of-band error */ }, // optional, used for errors that can't be correlated back to a request
};

/* Events */

export enum AuthenticationServiceEvent {
  USER_REGISTERED = 'user_registered',
}

export enum ServiceEvents {
  ServiceStarted='ServiceRunning',
  ServiceStopped='ServiceStopped'
}

export enum RPCEvents {
  StartSyncing='StartSyncing',
  StopSyncing='StopSyncing'
}

export enum MarketEvents {
  MarkedCreated='MarketCreated',
  MarketDestroyed='MarketDestroyed'
}

export enum UserEvents {
  EventOne="EventOne"
}

export enum ExchangeEvents {
  WorkRelationshipCreated='WorkRelationshipCreated',
}

export enum StorageEvents {
  HOST_CHANGED='HostChanged',
  DATA_ADDED= 'DataAdded',
  DATA_RETRIEVED='DataRetrieved',
}

export enum WhisperEvents {
    NewPublicWhisperMessage='NewPublicWhisperMessage',
    NewPrivateWhisperMessage='NewPrivateWhisperMessage',
    ChatError='ChatError'
}

/* Providers */

export enum AuthenticationProviders {
  Fortmatic='Fortmatic',
  Metamask='Metamask',
  Torus='Torus'
}

export enum StorageProviders {
  IPFS = 'ipfs'
}

/* Database */

export enum DBHealthStatus {
  
}