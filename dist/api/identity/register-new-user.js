var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Contract, ethers } from 'ethers';
import opportunityService from '../../OpportunityService';
import { Contracts } from '../../constants';
import addressMap from '../../blockchain/addresses.json';
import abiMap from '../../blockchain/abi.json';
function registerNewUser() {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            try {
                const userRegistrationAddress = addressMap[opportunityService.getEthNetwork()][Contracts.USER_REGISTRATION];
                const userRegistrationInterface = abiMap[Contracts.USER_REGISTRATION];
                const msgSender = yield opportunityService.getSignersInterface()._address;
                if (typeof msgSender == 'undefined')
                    throw new Error('Message sender is undefined');
                const userRegistrationInstance = new ethers.Contract(userRegistrationAddress, userRegistrationInterface, opportunityService.getProviderInterface());
                console.log('Checking true identificaiton of msgSender: ' + msgSender);
                const id = yield userRegistrationInstance.getTrueIdentification(msgSender);
                console.log('The true identificaiton is: ' + id);
                if (id == '0x0000000000000000000000000000000000000000') {
                    console.log('Registering new user: ' + msgSender);
                    const tx = yield new Contract(addressMap[opportunityService.getEthNetwork()][Contracts.USER_REGISTRATION], abiMap[Contracts.USER_REGISTRATION])
                        .connect(opportunityService.getSignersInterface())
                        .registerNewUser({
                        from: msgSender
                    });
                    console.log(tx);
                    const receipt = yield tx.wait();
                    console.log('the receipt');
                    console.log(receipt);
                    if (Number(receipt.status) === 1) {
                        console.log('transaction succeeded');
                        resolve(true);
                    }
                    else {
                        console.log('Transaction failed');
                        resolve(false);
                    }
                }
                else {
                    console.log('User already registered');
                    resolve(false);
                }
            }
            catch (error) {
                console.log(error);
                reject('An error occurred while trying to complete the registration.');
            }
        }));
    });
}
export default registerNewUser;
//# sourceMappingURL=register-new-user.js.map