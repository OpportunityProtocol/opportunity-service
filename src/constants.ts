require('dotenv').config()

/* Contracts */
export const ABI_LIST = [
  'CONTROL',
  'DISPUTE',
  'WORK_EXCHANGE',
  'WORK_RELATIONSHIP',
  'MARKET',
  'MARKET_FACTORY'
]

export enum Contracts {
  CONTROL='0x',
  DISPUTE='0x',
  WORK_EXCHANGE='0X',
  WORK_RELATIONSHIP='0X',
  MARKET='0x',
  MARKET_FACTORY='0x'
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
  httpAddresses: [process.env.OpportunityNodeHTTP], // optional, default empty array
  wsAddresses: [], // optional, default empty array
  ipcAddresses: [process.env.OpportunityNodeIPC], // optional, default empty array
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
  EventOne="EventOne"
}

export enum StorageEvents {
  HOST_CHANGED='HostChanged',
  DATA_ADDED= 'DataAdded',
  DATA_RETRIEVED='DataRetrieved',
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