
import ethers from 'ethers';
import { Contracts, UserEvents } from "../../constants";
import { LogDescription, Interface, Result, EventFragment } from "@ethersproject/abi";

import abiMap from '../../blockchain/abi.json';
import opportunityEventEmitter from '../../events/OpportunityEventEmitter';

function processUserRegistered(log) {
    try {
    const iface : Interface = new ethers.utils.Interface(abiMap[Contracts.USER_REGISTRATION]);
    const decodedLog : LogDescription = iface.parseLog(log);
    const { args, signature } = decodedLog;

    const registeredUniversalAddress : String = args[0];
    opportunityEventEmitter.emit(UserEvents.UserRegistered, registeredUniversalAddress);
    } catch(error) {
        console.log('processUserRegistered: ' + error);
    }
}

export default processUserRegistered;