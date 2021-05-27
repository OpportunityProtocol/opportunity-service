"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logoutMetamask = exports.loginMetamask = void 0;
function loginMetamask() {
    return __awaiter(this, void 0, void 0, function* () {
        if (window.ethereum) {
            window.web3 = new Web3(ethereum);
            try {
                yield ethereum.enable();
                var connectedAccount = yield web3.eth.getAccounts();
                return connectedAccount;
                s;
            }
            catch (error) {
                // User denied account access...
            }
        }
    });
}
exports.loginMetamask = loginMetamask;
function logoutMetamask() {
}
exports.logoutMetamask = logoutMetamask;
//# sourceMappingURL=authenticate-user.js.map