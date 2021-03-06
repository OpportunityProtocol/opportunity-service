
import ethers from 'ethers';
import { Contracts, UserEvents } from "../../constants";
import { LogDescription, Interface, Result, EventFragment } from "@ethersproject/abi";

import abiMap from '../../blockchain/abi.json';
import opportunityEventEmitter from '../../events/OpportunityEventEmitter';

function processUserSummaryCreated(log) {
    try {
    const iface : Interface = new ethers.utils.Interface(abiMap[Contracts.USER_REGISTRATION]);
    const decodedLog : LogDescription = iface.parseLog(log);
    const { args, signature } = decodedLog;

    const userSummaryContractAddress : String = args[0];
    const userRegistrationNumber : Number = args[1];
    const registeredUniversalAddress : String = args[2]
    const userSummaryData : Object = { userSummaryContractAddress, userRegistrationNumber, registeredUniversalAddress }
    opportunityEventEmitter.emit(UserEvents.UserSummaryCreated, userSummaryData);
    } catch(error) {
        console.log(error);
    }
}

export default processUserSummaryCreated;