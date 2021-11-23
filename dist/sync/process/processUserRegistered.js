import ethers from 'ethers';
import { Contracts, UserEvents } from "../../constants";
import abiMap from '../../blockchain/abi.json';
import opportunityEventEmitter from '../../events/OpportunityEventEmitter';
function processUserRegistered(log) {
    try {
        const iface = new ethers.utils.Interface(abiMap[Contracts.USER_REGISTRATION]);
        const decodedLog = iface.parseLog(log);
        const { args, signature } = decodedLog;
        const registeredUniversalAddress = args[0];
        console.log('Processing: ' + 'UserRegistered event with args: ' + registeredUniversalAddress);
        console.log('Successfully processedUserRegistered');
        opportunityEventEmitter.emit(UserEvents.UserRegistered, registeredUniversalAddress);
    }
    catch (error) {
        console.log('processUserRegistered: ' + error);
    }
}
export default processUserRegistered;
//# sourceMappingURL=processUserRegistered.js.map