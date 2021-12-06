import { Contract, Transaction } from 'ethers';
import opportunityService from '../../OpportunityService';
import { Contracts } from '../../constants';

import addressMap from '../../blockchain/addresses.json'
import abiMap from '../../blockchain/abi.json'
import { Result } from 'ethers/lib/utils';

async function registerNewUser() {
    try {
const msgSender = await opportunityService.getSignersInterface()._address
console.log('Registering new user: ' + msgSender)

if (typeof msgSender == 'undefined') throw new Error('Message sender is undefined')

const txResult = new Contract(
    addressMap[opportunityService.getEthNetwork()][Contracts.USER_REGISTRATION],
    abiMap[Contracts.USER_REGISTRATION]
    ).connect(opportunityService.getSignersInterface())
    .registerNewUser({
        from: msgSender
    })
    } catch(error) {
        console.log(error)
    }
}

export default registerNewUser;