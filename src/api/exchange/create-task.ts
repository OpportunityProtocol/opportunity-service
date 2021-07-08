import { FakeTransaction, Transaction, TxData } from "ethereumjs-tx";
import { Contracts, ExchangeEvents, MarketEvents } from "../../constants";
import opportunityEventEmitter from "../../events/OpportunityEventEmitter";
import { ParamObject } from "../../types";

import * as abiMap from '../../blockchain/abi.json';
import * as bytecodeMap from '../../blockchain/bytecode.json';
import opportunityService from "../../OpportunityService";
import { ethers } from 'ethers';
import opportunityStorageProvider from "../../modules/storage/OpportunityStorageProvider";
import { Result } from "ethers/lib/utils";

const Tx = require("ethereumjs-tx").Transaction;

async function createTask(data) : Promise<void> {
    const abi = abiMap[Contracts.MARKET];
    const { taskOwner, taskMarket } = data;

    const taskMetadataPointer = ''; //= await opportunityStorageProvider.storeRawContent(data);

    try {
    console.log('AAAAAAAAAAAAAA')
    console.log(opportunityService.getSignersInterface())
    console.log('Address: ' + opportunityService.getSignersInterface()._address)
    const contract = await new ethers.Contract('0xef4048590cf6872ff0cf7cd076fb26a0a5f006da', abi).connect(opportunityService.getSignersInterface());
    const txResult : Promise<Result> = await contract.functions.createJob('0xA165eCE4C33De24b2A81a93F4d37664049a9bDC9', taskMetadataPointer);
    } catch(error) {
        console.log('Service: Caught error creating new job: ' + error);
    }
}

export { createTask }