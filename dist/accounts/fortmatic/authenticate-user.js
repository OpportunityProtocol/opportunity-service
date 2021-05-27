"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logoutFortmatic = exports.loginFortmatic = void 0;
const index_1 = require("./index");
function loginFortmatic() {
    return index_1.fm.user.login().then(() => {
        return index_1.web3.eth.getAccounts().then(accounts => {
            return accounts[0];
        });
    });
}
exports.loginFortmatic = loginFortmatic;
function logoutFortmatic() {
}
exports.logoutFortmatic = logoutFortmatic;
//# sourceMappingURL=authenticate-user.js.map