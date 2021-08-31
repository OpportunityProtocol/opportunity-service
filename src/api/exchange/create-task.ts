import { FakeTransaction, Transaction, TxData } from "ethereumjs-tx";
import { Contracts, ContractType } from "../../constants";
import opportunityEventEmitter from "../../events/OpportunityEventEmitter";
import { ParamObject } from "../../types";

import * as abiMap from '../../blockchain/abi.json';
import * as bytecodeMap from '../../blockchain/bytecode.json';
import opportunityService from "../../OpportunityService";
import { ethers } from 'ethers';
import opportunityStorageProvider from "../../modules/storage/OpportunityStorageProvider";

const Tx = require("ethereumjs-tx").Transaction;

async function createTask(data) : Promise<void> {
    const parsedData = JSON.parse(data);
    console.log('Service printing data')
    console.log(data)

    const abi = abiMap[Contracts.MARKET];
    console.log(abi)

    const taskOwner = parsedData["taskOwner"];
    const taskMarket = parsedData["taskMarket"]

    console.log(taskOwner)
    console.log(taskMarket)

    const taskMetadataPointer = ''; //= await opportunityStorageProvider.storeRawContent(data);

    try {
    console.log('AAAAAAAAAAAAAA')
    console.log(opportunityService.getSignersInterface())
    console.log(data)
    const contract = await new ethers.Contract(taskMarket, abi).connect(opportunityService.getSignersInterface());
    const txResponse = await contract.functions.createJob(ContractType.NORMAL, taskMetadataPointer);

    console.log(txResponse)
    } catch(error) {
        console.log('Service: Caught error creating new job: ' + error);
    }
}

export { createTask }