

import Web3 from 'web3';
import { torus } from './torus';

async function loginTorus() : Promise<string> {
    await torus.setProvider({ host: 'localhost:7545' });
    await torus.login({}).then(address => {
        return address;
    });
}

async function logoutTorus() {
    torus.cleanUp();
}

async function isLoggedIn() {
    return web3.eth.getAccounts((err, accounts) => {
        return accounts.length == 0 ? false : true
    });
}

export { loginTorus, logoutTorus, isLoggedIn };