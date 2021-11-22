import { FakeTransaction, Transaction, TxData } from "ethereumjs-tx";
import { Contracts, ContractType } from "../../constants";
import opportunityEventEmitter from "../../events/OpportunityEventEmitter";
import { ParamObject } from "../../types";

import * as abiMap from '../../blockchain/abi.json';
import * as addressMap from '../../blockchain/addresses.json'
import * as bytecodeMap from '../../blockchain/bytecode.json';
import opportunityService from "../../OpportunityService";
import { ethers, ContractFactory } from 'ethers';
import opportunityStorageProvider from "../../modules/storage/OpportunityStorageProvider";
import { Result } from "ethers/lib/utils";

const Tx = require("ethereumjs-tx").Transaction;

async function createDispute(data) : Promise<void> {
    //createData(data)

    const parsedData = JSON.parse(data)
    const abi = abiMap[Contracts.DISPUTE]

    const complaintMetadataPointer = parsedData['complaintMetadataPointer']
    const complaintResponseMetadataPointer = parsedData['complaintResponseMetadataPointer']
    const relationshipAddress = parsedData['relationshipAddress']

    console.log(abi)
    console.log(parsedData)

    try {
        // The factory we use for deploying contracts
        const disputeContractfactory = new ContractFactory(abi, bytecodeMap[Contracts.DISPUTE], opportunityService.getSignersInterface())

        // Deploy an instance of the contract
        const disputeContract = await disputeContractfactory.deploy(relationshipAddress, addressMap[Contracts.SCHEDULER], complaintMetadataPointer, complaintResponseMetadataPointer);
        const txReceipt = await disputeContract.deployTransaction.wait()
        console.log(txReceipt)
    } catch(error) {
        console.log('Service: Caught error creating new job: ' + error);
    }
}

export { createDispute }