import { AuthenticationProviders } from "../constants";
import { login } from "./fortmatic/authenticate-user";

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
                const connectedAccount = login();
                return connectedAccount;
            case AuthenticationProviders.Metamask
                return;
        }
    }
}

const opportunityConnectionProvider : ConnectionProvider = new ConnectionProvider();