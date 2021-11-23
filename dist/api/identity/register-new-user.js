var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Contract } from 'ethers';
import opportunityService from '../../OpportunityService';
import { Contracts } from '../../constants';
import * as addressMap from '../../blockchain/addresses.json';
import * as abiMap from '../../blockchain/abi.json';
function registerNewUser(universalAddress) {
    return __awaiter(this, void 0, void 0, function* () {
        const txResult = new Contract(addressMap[Contracts.USER_REGISTRATION], abiMap[Contracts.USER_REGISTRATION])
            .connect(opportunityService.getSignersInterface())
            .functions
            .registerNewUser(universalAddress)
            .then(value => {
            return true;
        })
            .catch(error => {
            return false;
        });
    });
}
export default registerNewUser;
//# sourceMappingURL=register-new-user.js.map