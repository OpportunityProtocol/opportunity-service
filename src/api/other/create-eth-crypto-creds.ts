import EthCrypto from 'eth-crypto';
import jswallet from 'ethereumjs-wallet'
import opportunityService from '../..//OpportunityService';
import Web3 from 'web3'

async function createEthCryptoCreds(passphrase) {
    const entropy = Buffer.from(passphrase, 'utf-8')
    const identity = EthCrypto.createIdentity(entropy)

    const { address, publicKey, privateKey } = identity
    return identity
}

export { createEthCryptoCreds }