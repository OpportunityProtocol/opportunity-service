"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DBHealthStatus = exports.StorageProviders = exports.AuthenticationProviders = exports.StorageEvents = exports.ExchangeEvents = exports.UserEvents = exports.MarketEvents = exports.RPCEvents = exports.ServiceEvents = exports.AuthenticationServiceEvent = exports.RPC_CONFIGURATION = exports.Contracts = exports.ABI_LIST = void 0;
require('dotenv').config();
/* Contracts */
exports.ABI_LIST = [
    'MarketFactory',
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
})(Contracts = exports.Contracts || (exports.Contracts = {}));
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
    UserEvents["EventOne"] = "EventOne";
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