import { fm, web3 } from './index';

function login() {
    return fm.user.login().then(() => {
        return web3.eth.getAccounts().then(accounts => {
            return accounts[0]
        })
    })
}

function logout() {

}

export { login, logout };