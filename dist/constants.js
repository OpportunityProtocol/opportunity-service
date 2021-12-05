require('dotenv').config();
/* Contracts */
export const ABI_LIST = [
    'MarketFactory',
    'WorkRelationship',
    'Market',
    'UserSummary',
    'UserSummaryFactory',
    'UserRegistration'
];
export var Contracts;
(function (Contracts) {
    Contracts["CONTROL"] = "Control";
    Contracts["DISPUTE"] = "Dispute";
    Contracts["DAI"] = "Dai";
    Contracts["WORK_RELATIONSHIP"] = "WorkRelationship";
    Contracts["MARKET"] = "Market";
    Contracts["MARKET_FACTORY"] = "MarketFactory";
    Contracts["USER_REGISTRATION"] = "UserRegistration";
})(Contracts || (Contracts = {}));
export var ContractType;
(function (ContractType) {
    ContractType[ContractType["NORMAL"] = 0] = "NORMAL";
    ContractType[ContractType["FLASH"] = 1] = "FLASH";
})(ContractType || (ContractType = {}));
var DisputeStatus;
(function (DisputeStatus) {
    DisputeStatus[DisputeStatus["AWAITING_ARBITRATORS"] = 0] = "AWAITING_ARBITRATORS";
    DisputeStatus[DisputeStatus["PENDING_DECISION"] = 1] = "PENDING_DECISION";
    DisputeStatus[DisputeStatus["RESOLVED"] = 2] = "RESOLVED";
})(DisputeStatus || (DisputeStatus = {}));
export const RPC_CONFIGURATION = {
    httpAddresses: ['https://silent-bold-sea.rinkeby.quiknode.pro/1dbc05d5626c99bd2ad24ada0c962fc90f15b007/'],
    wsAddresses: ['wss://silent-bold-sea.rinkeby.quiknode.pro/1dbc05d5626c99bd2ad24ada0c962fc90f15b007/'],
    networkID: 3,
    connectionTimeout: 3000,
    errorHandler: function (err) { }, // optional, used for errors that can't be correlated back to a request
};
/* Events */
export var AuthenticationServiceEvent;
(function (AuthenticationServiceEvent) {
    AuthenticationServiceEvent["USER_REGISTERED"] = "user_registered";
})(AuthenticationServiceEvent || (AuthenticationServiceEvent = {}));
export var ServiceEvents;
(function (ServiceEvents) {
    ServiceEvents["ServiceStarted"] = "ServiceRunning";
    ServiceEvents["ServiceStopped"] = "ServiceStopped";
})(ServiceEvents || (ServiceEvents = {}));
export var RPCEvents;
(function (RPCEvents) {
    RPCEvents["StartSyncing"] = "StartSyncing";
    RPCEvents["StopSyncing"] = "StopSyncing";
})(RPCEvents || (RPCEvents = {}));
export var MarketEvents;
(function (MarketEvents) {
    MarketEvents["MarkedCreated"] = "MarketCreated";
    MarketEvents["MarketDestroyed"] = "MarketDestroyed";
})(MarketEvents || (MarketEvents = {}));
export var UserEvents;
(function (UserEvents) {
    UserEvents["UserRegistration"] = "UserRegistration";
    UserEvents["UserSummaryCreated"] = "UserSummaryCreated";
    UserEvents["UserRegistered"] = "UserRegistered";
    UserEvents["UserAssignedTrueIdentification"] = "UserAssignedTrueIdentification";
})(UserEvents || (UserEvents = {}));
export var ExchangeEvents;
(function (ExchangeEvents) {
    ExchangeEvents["WorkRelationshipCreated"] = "WorkRelationshipCreated";
    ExchangeEvents["DisputeCreated"] = "DisputeCreated";
})(ExchangeEvents || (ExchangeEvents = {}));
export var StorageEvents;
(function (StorageEvents) {
    StorageEvents["HOST_CHANGED"] = "HostChanged";
    StorageEvents["DATA_ADDED"] = "DataAdded";
    StorageEvents["DATA_RETRIEVED"] = "DataRetrieved";
})(StorageEvents || (StorageEvents = {}));
/* Providers */
export var AuthenticationProviders;
(function (AuthenticationProviders) {
    AuthenticationProviders["Fortmatic"] = "Fortmatic";
    AuthenticationProviders["Metamask"] = "Metamask";
    AuthenticationProviders["Torus"] = "Torus";
})(AuthenticationProviders || (AuthenticationProviders = {}));
export var StorageProviders;
(function (StorageProviders) {
    StorageProviders["IPFS"] = "ipfs";
})(StorageProviders || (StorageProviders = {}));
/* Database */
export var DBHealthStatus;
(function (DBHealthStatus) {
})(DBHealthStatus || (DBHealthStatus = {}));
//# sourceMappingURL=constants.js.map