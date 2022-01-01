import { FakeTransaction, Transaction, TxData } from "ethereumjs-tx";
import { Contracts, ContractType } from "../../constants";
import opportunityEventEmitter from "../../events/OpportunityEventEmitter";
import { ParamObject } from "../../types";

import abiMap from '../../blockchain/abi.json';
import addressMap from '../../blockchain/addresses.json'
import bytecodeMap from '../../blockchain/bytecode.json';
import opportunityService from "../../OpportunityService";
import { ethers } from 'ethers';
import opportunityStorageProvider from "../../modules/storage/OpportunityStorageProvider";
import { Result } from "ethers/lib/utils";

const Tx = require("ethereumjs-tx").Transaction;

async function createTask(data) : Promise<void> {
    console.log('a')
    const parsedData = JSON.parse(data);
    const abi = abiMap[Contracts.MARKET];
    console.log(abi)
    console.log(parsedData)

    const taskOwner = parsedData["taskOwner"];  
    const taskMarket = parsedData["taskMarket"]
    const taskBounty = Number(parsedData["taskBounty"])
    const taskMetadataPointer = parsedData["taskMetadataPointer"]
    console.log('b')
    console.log(taskOwner)
    console.log(taskMarket)
    console.log('h')
    console.log(taskBounty)
    console.log(taskMetadataPointer)

    if (taskOwner == null || taskMarket == 0 || taskBounty == 0 || taskMetadataPointer == '' ) {
        throw new Error('Null value in data')
    }

    console.log('C')
    try {
        console.log('d')
    const contract = await new ethers.Contract(taskMarket, abi).connect(opportunityService.getSignersInterface());
    console.log('e')
    const txResponse = await contract.functions.createJob(taskOwner, ContractType.NORMAL, taskMetadataPointer, addressMap[opportunityService.getEthNetwork()][Contracts.DAI])
    const txReceipt = await txResponse.wait()
    console.log(txReceipt)
    } catch(error) {
        console.log('Service: Caught error creating new job: ' + error);
    }
}

export { createTask }

/*

blockHash: "0xa923c23eec29567d8c2a84c85efbf852d8843448e6452ace4296142a5bf172c4"
blockNumber: 546
byzantium: true
confirmations: 1
contractAddress: null
cumulativeGasUsed: BigNumber {_hex: '0x1905c4', _isBigNumber: true}
events: [{…}]
from: "0x90F8bf6A479f320ead074411a4B0e7944Ea8c9C1"
gasUsed: BigNumber {_hex: '0x1905c4', _isBigNumber: true}
logs: [{…}]
logsBloom: "0x00000000000000000000000000000000000008000000000000000000000000000000008004000000000000000000000000000000000000001080000020000000000000000000000000000000008000000000000000000000000000000000000000000400000000000000000000000000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000000000000000000010000000040000000000000000000000000000000000000000000000000000080000008000800000000000000000002000000000000000000000000000000000000000000000000000000000000000000000000000"
status: 1
to: "0xF1fE363e6A32F91F52D55dCa56daFb1C88f9Dc2C"
transactionHash: "0x70f1f60a6a5056374cad6480dc1137be3a953d4ef724dac1190076305291096a"
transactionIndex: 0

*/