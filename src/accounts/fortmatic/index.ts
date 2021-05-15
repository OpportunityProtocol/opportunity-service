require('dotenv').config()
import Fortmatic from 'fortmatic';
import Web3 from 'web3';

import { loginFortmatic, logoutFortmatic } from './authenticate-user';

const fm = new Fortmatic(process.env.FORTMATIC_TEST_API_KEY);
const web3 = new Web3(fm.getProvider());

const fortmaticInterface = {
    fortmatic: fm,
    web3: web3,
    login: loginFortmatic,
    logout: logoutFortmatic
}

export { fm, web3 };
export default fortmaticInterface;

