"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const torus_1 = require("./torus");
const authenticate_user_1 = require("./authenticate-user");
const torusInterface = {
    torus: torus_1.torus,
    web3: authenticate_user_1.web3,
    login: authenticate_user_1.loginTorus,
    logout: authenticate_user_1.logoutTorus,
    isLoggedIn: authenticate_user_1.isLoggedIn
};
exports.default = torusInterface;
//# sourceMappingURL=index.js.map