import { loginMetamask, logoutMetamask } from "./authenticate-user";
import { isMetamaskEnabled } from "./check-metamask-enabled";

const metamaskInterface = {
    web3: isMetamaskEnabled() ? window.web3 : null,
    login: loginMetamask,
    logout: logoutMetamask
}

export default metamaskInterface;