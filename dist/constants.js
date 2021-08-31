"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DBHealthStatus = exports.StorageProviders = exports.AuthenticationProviders = exports.WhisperEvents = exports.StorageEvents = exports.ExchangeEvents = exports.UserEvents = exports.MarketEvents = exports.RPCEvents = exports.ServiceEvents = exports.AuthenticationServiceEvent = exports.RPC_CONFIGURATION = exports.ContractType = exports.Contracts = exports.ABI_LIST = void 0;
require('dotenv').config();
/* Contracts */
exports.ABI_LIST = [
    'MarketFactory',
    'WorkRelationship',
    'Market'
];
var Contracts;
(function (Contracts) {
    Contracts["CONTROL"] = "Control";
    Contracts["DISPUTE"] = "Dispute";
    Contracts["WORK_EXCHANGE"] = "WorkExchange";
    Contracts["WORK_RELATIONSHIP"] = "WorkRelationship";
    Contracts["MARKET"] = "Market";
    Contracts["MARKET_FACTORY"] = "MarketFactory";
    Contracts["EVALUATION"] = "Evaluation";
    Contracts["MARKETLIB"] = "MarketLib";
    Contracts["STRINGUTILS"] = "StringUtils";
    Contracts["USER_REGISTRATION"] = "UserRegistration";
})(Contracts = exports.Contracts || (exports.Contracts = {}));
var ContractType;
(function (ContractType) {
    ContractType[ContractType["NORMAL"] = 0] = "NORMAL";
    ContractType[ContractType["FLASH"] = 1] = "FLASH";
})(ContractType = exports.ContractType || (exports.ContractType = {}));
exports.RPC_CONFIGURATION = {
    httpAddresses: ['https://silent-bold-sea.rinkeby.quiknode.pro/1dbc05d5626c99bd2ad24ada0c962fc90f15b007/'],
    wsAddresses: ['wss://silent-bold-sea.rinkeby.quiknode.pro/1dbc05d5626c99bd2ad24ada0c962fc90f15b007/'],
    networkID: 3,
    connectionTimeout: 3000,
    errorHandler: function (err) { }, // optional, used for errors that can't be correlated back to a request
};
/* Events */
var AuthenticationServiceEvent;
(function (AuthenticationServiceEvent) {
    AuthenticationServiceEvent["USER_REGISTERED"] = "user_registered";
})(AuthenticationServiceEvent = exports.AuthenticationServiceEvent || (exports.AuthenticationServiceEvent = {}));
var ServiceEvents;
(function (ServiceEvents) {
    ServiceEvents["ServiceStarted"] = "ServiceRunning";
    ServiceEvents["ServiceStopped"] = "ServiceStopped";
})(ServiceEvents = exports.ServiceEvents || (exports.ServiceEvents = {}));
var RPCEvents;
(function (RPCEvents) {
    RPCEvents["StartSyncing"] = "StartSyncing";
    RPCEvents["StopSyncing"] = "StopSyncing";
})(RPCEvents = exports.RPCEvents || (exports.RPCEvents = {}));
var MarketEvents;
(function (MarketEvents) {
    MarketEvents["MarkedCreated"] = "MarketCreated";
    MarketEvents["MarketDestroyed"] = "MarketDestroyed";
})(MarketEvents = exports.MarketEvents || (exports.MarketEvents = {}));
var UserEvents;
(function (UserEvents) {
    UserEvents["UserRegistration"] = "UserRegistration";
    UserEvents["UserSummaryCreated"] = "UserSummaryCreated";
    UserEvents["UserRegistered"] = "UserRegistered";
    UserEvents["UserAssignedTrueIdentification"] = "UserAssignedTrueIdentification";
})(UserEvents = exports.UserEvents || (exports.UserEvents = {}));
var ExchangeEvents;
(function (ExchangeEvents) {
    ExchangeEvents["WorkRelationshipCreated"] = "WorkRelationshipCreated";
})(ExchangeEvents = exports.ExchangeEvents || (exports.ExchangeEvents = {}));
var StorageEvents;
(function (StorageEvents) {
    StorageEvents["HOST_CHANGED"] = "HostChanged";
    StorageEvents["DATA_ADDED"] = "DataAdded";
    StorageEvents["DATA_RETRIEVED"] = "DataRetrieved";
})(StorageEvents = exports.StorageEvents || (exports.StorageEvents = {}));
var WhisperEvents;
(function (WhisperEvents) {
    WhisperEvents["NewPublicWhisperMessage"] = "NewPublicWhisperMessage";
    WhisperEvents["NewPrivateWhisperMessage"] = "NewPrivateWhisperMessage";
    WhisperEvents["ChatError"] = "ChatError";
})(WhisperEvents = exports.WhisperEvents || (exports.WhisperEvents = {}));
/* Providers */
var AuthenticationProviders;
(function (AuthenticationProviders) {
    AuthenticationProviders["Fortmatic"] = "Fortmatic";
    AuthenticationProviders["Metamask"] = "Metamask";
    AuthenticationProviders["Torus"] = "Torus";
})(AuthenticationProviders = exports.AuthenticationProviders || (exports.AuthenticationProviders = {}));
var StorageProviders;
(function (StorageProviders) {
    StorageProviders["IPFS"] = "ipfs";
})(StorageProviders = exports.StorageProviders || (exports.StorageProviders = {}));
/* Database */
var DBHealthStatus;
(function (DBHealthStatus) {
})(DBHealthStatus = exports.DBHealthStatus || (exports.DBHealthStatus = {}));
//# sourceMappingURL=constants.js.map