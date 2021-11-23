import ethers from 'ethers';
import { Contracts, UserEvents } from "../../constants";
import abiMap from '../../blockchain/abi.json';
import opportunityEventEmitter from '../../events/OpportunityEventEmitter';
function processUserSummaryCreated(log) {
    try {
        const iface = new ethers.utils.Interface(abiMap[Contracts.USER_REGISTRATION]);
        const decodedLog = iface.parseLog(log);
        const { args, signature } = decodedLog;
        const userSummaryContractAddress = args[0];
        const userRegistrationNumber = args[1];
        const registeredUniversalAddress = args[2];
        console.log('Processing: ' + 'processUserSummaryCreated event with args: ' + registeredUniversalAddress + ' and ' + userSummaryContractAddress);
        const userSummaryData = { userSummaryContractAddress, userRegistrationNumber, registeredUniversalAddress };
        opportunityEventEmitter.emit(UserEvents.UserSummaryCreated, userSummaryData);
    }
    catch (error) {
        console.log(error);
    }
}
export default processUserSummaryCreated;
//# sourceMappingURL=processUserSummaryCreated.js.map