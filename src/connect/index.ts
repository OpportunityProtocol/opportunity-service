import { AuthenticationProviders } from "../constants";
import fortmaticInterface from "./fortmatic";
import metamaskInterface from './metamask';

class ConnectionProvider {
    private currentProvider : AuthenticationProviders;

    changeCurrentProvider(newProvider: AuthenticationProviders) {
        this.currentProvider = newProvider;
    }

    getCurrentProvider() {
        return this.currentProvider;
    }

    connect(currentProvider: AuthenticationProviders) {
        switch(currentProvider) {
            case AuthenticationProviders.Fortmatic:
                fortmaticInterface.login().then((connectedAccount) => {
                    this.changeCurrentProvider(AuthenticationProviders.Fortmatic);
                    return connectedAccount;
                })
            case AuthenticationProviders.Metamask:
                metamaskInterface.login().then((connectedAccount) => {
                    this.changeCurrentProvider(AuthenticationProviders.Metamask)
                    return connectedAccount;
                })
        }
    }
}

const opportunityConnectionProvider : ConnectionProvider = new ConnectionProvider();