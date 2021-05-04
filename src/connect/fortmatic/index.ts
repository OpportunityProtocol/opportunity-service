import Fortmatic from 'fortmatic';
import Web3 from 'web3';

import { loginFortmatic, logoutFortmatic } from './authenticate-user';
import { getBalances, getUserAccount } from './get-user-account-data';

const fm = new Fortmatic(process.env.FORTMATIC_TEST_API_KEY);
const web3 = new Web3(fm.getProvider());

const fortmaticInterface = {
    fortmatic: fm,
    web3: web3,
    login: loginFortmatic,
    logout: logoutFortmatic,
    getBalances: getBalances,
    getAccount: getUserAccount
}

export { fm, web3 };
export default fortmaticInterface;

