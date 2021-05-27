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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConnectionProvider = void 0;
const constants_1 = require("../constants");
const metamask_1 = __importDefault(require("./metamask"));
const torus_1 = __importDefault(require("./torus"));
class ConnectionProvider {
    constructor(rpc) {
        this.currentProvider = null;
        this.account = null;
        this.network = -1;
        this.rpc = null;
        this.terminate = () => {
            this.getProviderInterface().logout();
            this.changeCurrentProvider(null);
        };
        this.rpc = rpc;
    }
    changeCurrentProvider(newProvider) {
        this.currentProvider = newProvider;
    }
    getCurrentProvider() {
        return this.currentProvider;
    }
    getProviderInterface() {
        switch (this.currentProvider) {
            /*  case AuthenticationProviders.Fortmatic:
                  return fortmaticInterface;*/
            case constants_1.AuthenticationProviders.Torus:
                return torus_1.default;
            case constants_1.AuthenticationProviders.Metamask:
                return metamask_1.default;
        }
    }
    connect(currentProvider) {
        return __awaiter(this, void 0, void 0, function* () {
            switch (currentProvider) {
                /* case AuthenticationProviders.Fortmatic:
                     fortmaticInterface.login().then((connectedAccount) => {
                         this.changeCurrentProvider(AuthenticationProviders.Fortmatic);
                         return connectedAccount;
                     });
                     break;*/
                case constants_1.AuthenticationProviders.Metamask:
                    const metamaskAccount = yield metamask_1.default.login();
                    metamaskAccount.web3.eth.net.getId().then(id => {
                        return { address: metamaskAccount, network: id };
                    });
                    break;
                case constants_1.AuthenticationProviders.Torus:
                    yield torus_1.default.login()
                        .then(account => {
                        this.account = account;
                    })
                        .catch(err => {
                        //log err
                        console.log('ERRR');
                        console.log(err);
                        return { address: null, network: null };
                    });
                    console.log('Did we get the account here: ' + this.account);
                    this.rpc.eth.net.getId().then(id => {
                        console.log('DID WE EVEN MAKE IT HERE???');
                        console.log(this.account);
                        console.log(id);
                        this.network = id;
                    }).catch(err => {
                        //log err
                        console.log('ANOTHE RRRRR');
                        console.log(err);
                        return { address: null, network: null };
                    });
                    console.log('dsdfsd: ' + this.network);
                    return {
                        address: this.account,
                        network: this.network
                    };
                    break;
                default:
            }
        });
    }
}
exports.ConnectionProvider = ConnectionProvider;
//# sourceMappingURL=index.js.map