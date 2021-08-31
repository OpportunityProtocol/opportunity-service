
import ethers from 'ethers';
import { Contracts, UserEvents } from "../../constants";
import { LogDescription, Interface, Result, EventFragment } from "@ethersproject/abi";

import abiMap from '../../blockchain/abi.json';
import opportunityEventEmitter from '../../events/OpportunityEventEmitter';

function processAssignedTrueIdentification(log) {
    try {
    const iface : Interface = new ethers.utils.Interface(abiMap[Contracts.USER_REGISTRATION]);
    const decodedLog : LogDescription = iface.parseLog(log);
    const { args, signature } = decodedLog;

    const registeredUniversalAddress = args[0];
    const userSummaryContractAddress = args[1];

    console.log('Processing: ' + 'processAssignedTrueIdentification event with args: ' + registeredUniversalAddress + ' and ' + userSummaryContractAddress);

    console.log('Successfully processAssignedTrueIdentification');

    const trueIdentificationData = { registeredUniversalAddress, userSummaryContractAddress }
    opportunityEventEmitter.emit(UserEvents.UserAssignedTrueIdentification, trueIdentificationData);
    } catch(error) {
        console.log('processAssignedTrueIdentification: ' + error);
    }
}

export default processAssignedTrueIdentification;