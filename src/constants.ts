export const ABI_LIST = [
  'MarketFactory',
  'WorkRelationship',
  'Market',
  'UserSummary',
  'UserSummaryFactory',
  'UserRegistration',
]

export enum Contracts {
  CONTROL = 'Control',
  DISPUTE = 'Dispute',
  DAI = 'Dai',
  WORK_RELATIONSHIP = 'WorkRelationship',
  MARKET = 'Market',
  MARKET_FACTORY = 'MarketFactory',
  USER_REGISTRATION = 'UserRegistration',
  SCHEDULER = 'Scheduler',
}

export enum WorkRelationshipState {
  UNCLAIMED,
  PENDING,
  PENDING_DISPUTE,
  CANCELLED,
  COMPLETED,
  EVALUATING,
  CLAIMED,
}

export enum ContractType {
  NORMAL,
  FLASH,
}

enum DisputeStatus {
  AWAITING_ARBITRATORS,
  PENDING_DECISION,
  RESOLVED,
}

/* Web3 */

export enum Networks {
  Ropsten = 'Ropsten',
  Mainnet = 'Mainnet',
  Rinkeby = 'Rinkeby',
  Local = 'Local',
}

export const RPC_CONFIGURATION = {
  httpAddresses: [
    'https://silent-bold-sea.rinkeby.quiknode.pro/1dbc05d5626c99bd2ad24ada0c962fc90f15b007/',
  ], // optional, default empty array
  wsAddresses: [
    'wss://silent-bold-sea.rinkeby.quiknode.pro/1dbc05d5626c99bd2ad24ada0c962fc90f15b007/',
  ], // optional, default empty array
  networkID: 3, // optional, used to verify connection to the intended network (blockchain)
  connectionTimeout: 3000, // optional, default 3000
  errorHandler: function (err) {
    /* out-of-band error */
  }, 
}

/* Events */
export enum AuthenticationServiceEvent {
  USER_REGISTERED = 'user_registered',
}

export enum ServiceEvents {
  ServiceStarted = 'ServiceRunning',
  ServiceStopped = 'ServiceStopped',
}

export enum RPCEvents {
  StartSyncing = 'StartSyncing',
  StopSyncing = 'StopSyncing',
}

export enum MarketEvents {
  MarkedCreated = 'MarketCreated',
  MarketDestroyed = 'MarketDestroyed',
}

export enum UserEvents {
  UserRegistration = 'UserRegistration',
  UserSummaryCreated = 'UserSummaryCreated',
  UserRegistered = 'UserRegistered',
  UserAssignedTrueIdentification = 'UserAssignedTrueIdentification',
}

export enum ExchangeEvents {
  WorkRelationshipCreated = 'WorkRelationshipCreated',
  DisputeCreated = 'DisputeCreated',
}

export enum StorageEvents {
  HOST_CHANGED = 'HostChanged',
  DATA_ADDED = 'DataAdded',
  DATA_RETRIEVED = 'DataRetrieved',
}

/* Providers */

export enum AuthenticationProviders {
  Fortmatic = 'Fortmatic',
  Metamask = 'Metamask',
  Torus = 'Torus',
}

export enum StorageProviders {
  IPFS = 'ipfs',
}

/* Database */

export enum DBHealthStatus {}
