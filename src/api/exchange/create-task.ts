import { FakeTransaction, Transaction, TxData } from "ethereumjs-tx";
import { Contracts, ExchangeEvents, MarketEvents } from "../../constants";
import opportunityEventEmitter from "../../events/OpportunityEventEmitter";
import { ParamObject } from "../../types";

import * as abiMap from '../../blockchain/abi.json';
import * as bytecodeMap from '../../blockchain/bytecode.json';
import opportunityService from "../../OpportunityService";
import { ethers } from 'ethers';
import opportunityStorageProvider from "../../modules/storage/OpportunityStorageProvider";

const Tx = require("ethereumjs-tx").Transaction;

async function createTask(data) : Promise<void> {
    const abi = abiMap[Contracts.MARKET];
    const { taskOwner, taskMarket } = data;

    const taskMetadataPointer = ''; //= await opportunityStorageProvider.storeRawContent(data);

    try {
    console.log('AAAAAAAAAAAAAA')
    console.log(opportunityService.getSignersInterface())
    console.log('Address: ' + opportunityService.getSignersInterface()._address)
    const contract = await new ethers.Contract('0xbA4251F32a7E2B4cD367bfFB96D126d287A9E5B6', abi).connect(opportunityService.getSignersInterface());
    const txResponse = await contract.functions.createJob('0xA165eCE4C33De24b2A81a93F4d37664049a9bDC9', taskMetadataPointer);

    console.log(txResponse)
    } catch(error) {
        console.log('Service: Caught error creating new job: ' + error);
    }
}

export { createTask }