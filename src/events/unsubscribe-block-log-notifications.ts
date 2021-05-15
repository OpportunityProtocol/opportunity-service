var ethrpc = require('ethrpc');

const blockStream = ethrpc.getBlockStream();


const unsubscribeBlockAdded = (callback) => {
        // Do not use  - no valid use case
    return blockStream.subscribeToOnBlockRemoved(callback)
}

const unsubscribeLogAdded = (callback) => {
    return blockStream.subscribeToOnLogRemoved(callback);
}

export { unsubscribeLogAdded, unsubscribeBlockAdded };