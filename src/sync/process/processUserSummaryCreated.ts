
import ethers from 'ethers';
import { Contracts, UserEvents } from "../../constants";
import { LogDescription, Interface, Result, EventFragment } from "@ethersproject/abi";

import abiMap from '../../blockchain/abi.json';
import opportunityEventEmitter from '../../events/OpportunityEventEmitter';

function processUserSummaryCreated(log) {
    try {
    const iface : Interface = new ethers.utils.Interface(abiMap[Contracts.UserRegistration]);
    const decodedLog : LogDescription = iface.parseLog(log);
    const { args, signature } = decodedLog;

    const userSummaryContractAddress = args[0];
    const userRegistrationNumber = args[1];
    const registeredUniversalAddress = args[2]

    console.log('Processing: ' + 'processUserSummaryCreated event with args: ' + registeredUniversalAddress + ' and ' + userSummaryContractAddress);
    const userSummaryData = { userSummaryContractAddress, userRegistrationNumber, registeredUniversalAddress }
    opportunityEventEmitter.emit(UserEvents.UserSummaryCreated, userSummaryData);
    console.log('Successfgully processUserSummaryCreated');


    } catch(error) {
        console.log('processAssignedTrueIdentification: ' + error);
    }
}

export default processUserSummaryCreated;