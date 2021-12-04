import { Contract, Transaction } from 'ethers';
import opportunityService from '../../OpportunityService';
import { Contracts } from '../../constants';

import addressMap from '../internal/addresses'
import abiMap from '../internal/abis'
import { Result } from 'ethers/lib/utils';

async function registerNewUser() {
    try {
const msgSender = await opportunityService.getSignersInterface()._address
console.log('Registering new user: ' + msgSender)

    

const txResult = new Contract(
    addressMap['UserRegistration'],
    abiMap['UserRegistration']
    ).connect(opportunityService.getSignersInterface())
    .registerNewUser({
        from: msgSender
    })
    } catch(error) {
        console.log(error)
    }
}

export default registerNewUser;