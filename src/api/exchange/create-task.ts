import { FakeTransaction, Transaction, TxData } from "ethereumjs-tx";
import { Contracts, ExchangeEvents, MarketEvents } from "../../constants";
import opportunityEventEmitter from "../../events/OpportunityEventEmitter";
import { ParamObject } from "../../types";

import * as abiMap from '../../blockchain/abi.json';
import * as bytecodeMap from '../../blockchain/bytecode.json';
import opportunityService from "../../OpportunityService";
import ethers from 'ethers';
import opportunityStorageProvider from "../../modules/storage/OpportunityStorageProvider";

const Tx = require("ethereumjs-tx").Transaction;

async function createTask(data) : Promise<void> {
    const abi = abiMap[Contracts.WORK_RELATIONSHIP];
    const bytecode = bytecodeMap[Contracts.WORK_RELATIONSHIP];
    const { taskOwner } = data;
    const overrides = {
        from: taskOwner
    }

    const taskMetadataPointer = await opportunityStorageProvider.storeContent(data);

    const contractFactory = new ethers.ContractFactory(abi, bytecode, opportunityService.getSignersInterface());
    const contract = await contractFactory.deploy(taskMetadataPointer, overrides);
    contract.deployTransaction.wait()
    .then(receipt => {

    //TODO: update requester general task description

    console.log('Successfully')
    })
    .catch(error => {
        console.log('Error deploying new work relationship.')
    })
}

export { createTask }