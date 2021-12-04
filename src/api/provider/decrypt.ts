import Web3 from 'web3'
import opportunityService from '../../OpportunityService'

export async function decrypt (keystore, passphrase) {
    const web3 : Web3 = opportunityService.getDefaultProviderInterface()

    const data = await web3.eth.accounts.decrypt(keystore, passphrase)
    return data
}