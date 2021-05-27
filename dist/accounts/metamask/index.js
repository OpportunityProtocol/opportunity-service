"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const authenticate_user_1 = require("./authenticate-user");
const check_metamask_enabled_1 = require("./check-metamask-enabled");
const metamaskInterface = {
    web3: check_metamask_enabled_1.isMetamaskEnabled() ? window.web3 : null,
    login: authenticate_user_1.loginMetamask,
    logout: authenticate_user_1.logoutMetamask
};
exports.default = metamaskInterface;
//# sourceMappingURL=index.js.map