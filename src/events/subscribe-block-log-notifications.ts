import { processLog } from "../sync/process/process-log";
import { processBlock } from "./process-block";

var ethrpc = require('ethrpc');

const blockStream = ethrpc.getBlockStream();

/**
 * 
 * @param address 
 * @param topics 
 * @returns logFilterToken
 */
const addLogFilter = (address : string, topics : Array<string>) : string => blockStream.addLogFilter({
    address,
    topics
});

/**
 * 
 * @returns onBlockAddedToken
 */
const subscribeBlockAdded = () : string => {
    return blockStream.subscribeToOnBlockAdded(processBlock);
}

/**
 * 
 * @param callback Callback receives the log
 * @returns onLogAddedToken
 */
const subscribeLogAdded = () : string => {
    return blockStream.subscribeToOnLogAdded(processLog);
}

export { addLogFilter, subscribeBlockAdded, subscribeLogAdded  };