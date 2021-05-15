import { FakeTransaction, Transaction, TxData } from "ethereumjs-tx";
import { opportunityConnectionProvider } from "../../accounts";
import { Contracts, MarketEvents } from "../../constants";
import opportunityEventEmitter from "../../events/OpportunityEventEmitter";
import ethrpc from "../../rpc/interface/rpc-interface";
import { ParamObject } from "../../types";
import { retrieveBytecode } from '../../util';

import * as abiMap from '../../blockchain/abi.json';

const Tx = require("ethereumjs-tx").Transaction;

async function createTask(taskName) : Promise<string> {
    const abi = abiMap[Contracts.WORK_RELATIONSHIP];

    const bytecode = retrieveBytecode(Contracts.WORK_RELATIONSHIP, ethrpc);

    const contract = ethrpc.eth.Contract(JSON.parse(abi));
    const tx = contract.deploy({ data: bytecode, arguments: [taskName] });

    let estimatedGas;
    tx.estimateGas((err, gas) => {
        estimatedGas = gas;
    });

    const txParameter : Transaction = {
        from: opportunityConnectionProvider.getProviderInterface().web3.eth.getAccounts()[0],
        gas: opportunityConnectionProvider.getProviderInterface().web3.utils.toHex(800000),
        gasPrice: opportunityConnectionProvider.getProviderInterface().web3.utils.toHex(opportunityConnectionProvider.getProviderInterface().web3.utils.toWei('30', 'gwei')),
        data: bytecode
    }
    
    
    const txHash = new Promise<string>((resolve, reject) => {
        tx.send(txParameter,  (err, transactionHash : string) => {
            console.log('Transaction Hash :', transactionHash);
            resolve(transactionHash)
        })
        .on('confirmation', (confirmationNumber : number, receipt : Object) => {})
        .then((newContractInstance) => {
            opportunityEventEmitter.emit(MarketEvents.MarkedCreated);
            console.log('Deployed Contract Address : ', newContractInstance.options.address);
        })   
    });

    return txHash;
}

export { createTask }