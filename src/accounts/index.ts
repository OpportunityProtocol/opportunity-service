import { resolve } from "node:path";
import { AuthenticationProviders } from "../constants";
import fortmaticInterface from "./fortmatic";
import metamaskInterface from './metamask';
import torusInterface from "./torus";

class ConnectionProvider {
    private currentProvider : AuthenticationProviders = null;
    private account : string = null;
    private network : number = -1;
    private rpc = null;

    constructor(rpc) {
        this.rpc = rpc;
    }

    changeCurrentProvider(newProvider: AuthenticationProviders) {
        this.currentProvider = newProvider;
    }

    getCurrentProvider() {
        return this.currentProvider;
    }

    getProviderInterface() {
        switch(this.currentProvider) {
          /*  case AuthenticationProviders.Fortmatic:
                return fortmaticInterface;*/
            case AuthenticationProviders.Torus:
                return torusInterface;
            case AuthenticationProviders.Metamask:
                return metamaskInterface;
        }
    }

    async connect(currentProvider: AuthenticationProviders) : Promise<Object> {
        switch(currentProvider) {
           /* case AuthenticationProviders.Fortmatic:
                fortmaticInterface.login().then((connectedAccount) => {
                    this.changeCurrentProvider(AuthenticationProviders.Fortmatic);
                    return connectedAccount;
                });
                break;*/
            case AuthenticationProviders.Metamask:
                const metamaskAccount = await metamaskInterface.login();
                metamaskAccount.web3.eth.net.getId().then(id => {
                    return { address: metamaskAccount, network: id }
                })
                break;
            case AuthenticationProviders.Torus:
                await torusInterface.login()
                .then(account => {
                    this.account = account;
                })
                .catch(err => {
                    //log err
                    console.log('ERRR')
                    console.log(err)

                    return { address: null, network: null }
                });

                console.log('Did we get the account here: ' + this.account)

                this.rpc.eth.net.getId().then(id => {
                    console.log('DID WE EVEN MAKE IT HERE???')
                    console.log(this.account)
                    console.log(id)
                    this.network = id;
                }).catch(err => {
                    //log err
                    console.log('ANOTHE RRRRR')
                    console.log(err)

                    return { address: null, network: null }
                });

                console.log('dsdfsd: ' + this.network)

                return {
                    address: this.account,
                    network: this.network
                }
                break;
            default:
        }
    }

    terminate = () => {
        this.getProviderInterface().logout();
        this.changeCurrentProvider(null)
    }
}

export { ConnectionProvider };