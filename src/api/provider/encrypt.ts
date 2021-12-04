import Web3 from 'web3'
import opportunityService from '../../OpportunityService'

export async function encrypt(privKey, password) {
    const web3 : Web3 = opportunityService.getDefaultProviderInterface()

    const keystore = await web3.eth.accounts.encrypt(privKey, password);
    return keystore
}