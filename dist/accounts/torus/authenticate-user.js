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
exports.isLoggedIn = exports.logoutTorus = exports.loginTorus = void 0;
const torus_1 = require("./torus");
function loginTorus() {
    return __awaiter(this, void 0, void 0, function* () {
        yield torus_1.torus.setProvider({ host: 'localhost:7545' });
        yield torus_1.torus.login({}).then(address => {
            return address;
        });
    });
}
exports.loginTorus = loginTorus;
function logoutTorus() {
    return __awaiter(this, void 0, void 0, function* () {
        torus_1.torus.cleanUp();
    });
}
exports.logoutTorus = logoutTorus;
function isLoggedIn() {
    return __awaiter(this, void 0, void 0, function* () {
        return web3.eth.getAccounts((err, accounts) => {
            return accounts.length == 0 ? false : true;
        });
    });
}
exports.isLoggedIn = isLoggedIn;
//# sourceMappingURL=authenticate-user.js.map