async function loginMetamask() {
    if (window.ethereum) {
        window.web3 = new Web3(ethereum);
        try {
            await ethereum.enable();
            var connectedAccount = await web3.eth.getAccounts();
            return connectedAccount;
       s } catch (error) {
            // User denied account access...
        }
    }
}

function logoutMetamask() {

}

export { loginMetamask, logoutMetamask };