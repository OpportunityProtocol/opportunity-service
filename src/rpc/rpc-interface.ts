"use strict";

function generateRpc(ethrpc) {
  return {
    constants: ethrpc.constants,
    errors: ethrpc.errors,
    eth: ethrpc.eth,
    net: ethrpc.net,
    clear: ethrpc.clear,
    startBlockStream: ethrpc.startBlockStream,
    getBlockStream: ethrpc.getBlockStream,
    getCurrentBlock: ethrpc.getCurrentBlock,
    getGasPrice: ethrpc.getGasPrice,
    getNetworkID: ethrpc.getNetworkID,
    getLogs: ethrpc.getLogs,
    getTransport: ethrpc.getTransport,
    getTransactionReceipt: ethrpc.getTransactionReceipt,
    isUnlocked: ethrpc.isUnlocked,
    packageAndSubmitRawTransaction: ethrpc.packageAndSubmitRawTransaction,
    callContractFunction: ethrpc.callContractFunction,
    transact: ethrpc.transact,
    publish: ethrpc.publish,
    sha3: ethrpc.sha3,
  };
};

export { generateRpc };