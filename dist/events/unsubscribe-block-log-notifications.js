"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.unsubscribeBlockAdded = exports.unsubscribeLogAdded = void 0;
var ethrpc = require('ethrpc');
const blockStream = ethrpc.getBlockStream();
const unsubscribeBlockAdded = (callback) => {
    // Do not use  - no valid use case
    return blockStream.subscribeToOnBlockRemoved(callback);
};
exports.unsubscribeBlockAdded = unsubscribeBlockAdded;
const unsubscribeLogAdded = (callback) => {
    return blockStream.subscribeToOnLogRemoved(callback);
};
exports.unsubscribeLogAdded = unsubscribeLogAdded;
//# sourceMappingURL=unsubscribe-block-log-notifications.js.map