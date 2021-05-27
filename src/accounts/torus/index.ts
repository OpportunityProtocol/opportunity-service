import { torus } from './torus';
import { loginTorus, logoutTorus, isLoggedIn, web3 } from './authenticate-user';

const torusInterface = {
    torus,
    web3,
    login: loginTorus,
    logout: logoutTorus,
    isLoggedIn
}

export default torusInterface;