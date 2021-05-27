"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function generateRpcInterface(ethrpc) {
    return {
        constants: ethrpc.constants,
        eth: ethrpc.eth,
        net: ethrpc.net,
        web3: ethrpc.web3,
        shh: ethrpc.shh,
        miner: ethrpc.miner,
        personal: ethrpc.personal,
        sha3: ethrpc.sha3,
        publish: ethrpc.publish,
        connect: ethrpc.connect,
        clear: ethrpc.clear,
        startBlockStream: ethrpc.startBlockStream,
        getBlockStream: ethrpc.getBlockStream,
        getTransport: ethrpc.getTransport,
        getTransportName: ethrpc.getTransportName,
        getConfiguration: ethrpc.getConfiguration,
        getCoinbase: ethrpc.getCoinbase,
        getCurrentBlock: ethrpc.getCurrentBlock,
        getDebugOptions: ethrpc.getDebugOptions,
        getGasPrice: ethrpc.getGasPrice,
        getHighestNonce: ethrpc.getHighestNonce,
        callContractFunction: ethrpc.callContractFunction,
        callOrSendTransaction: ethrpc.callOrSendTransaction,
        signRawTransaction: ethrpc.signRawTransaction,
        signRawTransactionWithKey: ethrpc.signRawTransactionWithKey,
        packageRawTransaction: ethrpc.packageRawTransaction,
        packageRequest: ethrpc.packageRequest,
        packageAndSubmitRawTransaction: ethrpc.packageAndSubmitRawTransaction,
        packageAndSignRawTransaction: ethrpc.packageAndSignRawTransaction,
        ensureLatestBlock: ethrpc.ensureLatestBlock,
        isUnlocked: ethrpc.isUnlocked,
        waitForNextBlocks: ethrpc.waitForNextBlocks,
        resend: ethrpc.resend,
        resendRawTransaction: ethrpc.resendRawTransaction,
        transact: ethrpc.transact
    };
}
const rpc = generateRpcInterface(require('ethrpc'));
exports.default = rpc;
//# sourceMappingURL=rpc-interface.js.map