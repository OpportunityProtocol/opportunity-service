"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.subscribeLogAdded = exports.subscribeBlockAdded = exports.addLogFilter = void 0;
const process_log_1 = require("../sync/process/process-log");
const process_block_1 = require("./process-block");
var ethrpc = require('ethrpc');
const blockStream = ethrpc.getBlockStream();
/**
 *
 * @param address
 * @param topics
 * @returns logFilterToken
 */
const addLogFilter = (address, topics) => blockStream.addLogFilter({
    address,
    topics
});
exports.addLogFilter = addLogFilter;
/**
 *
 * @returns onBlockAddedToken
 */
const subscribeBlockAdded = () => {
    return blockStream.subscribeToOnBlockAdded(process_block_1.processBlock);
};
exports.subscribeBlockAdded = subscribeBlockAdded;
/**
 *
 * @param callback Callback receives the log
 * @returns onLogAddedToken
 */
const subscribeLogAdded = () => {
    return blockStream.subscribeToOnLogAdded(process_log_1.processLog);
};
exports.subscribeLogAdded = subscribeLogAdded;
//# sourceMappingURL=subscribe-block-log-notifications.js.map