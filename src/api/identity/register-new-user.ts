import { Contract, Transaction } from 'ethers';
import opportunityService from '../../OpportunityService';
import { Contracts } from '../../constants';

import * as addressMap from '../../blockchain/addresses.json';
import * as abiMap from '../../blockchain/abi.json';
import { Result } from 'ethers/lib/utils';

async function registerNewUser(universalAddress) {
    console.log('Starting service api')
    console.log(opportunityService.getSignersInterface())
    console.log(addressMap[Contracts.USER_REGISTRATION])
    console.log(abiMap[Contracts.USER_REGISTRATION])
console.log('making call')
const txResult = new Contract(addressMap[Contracts.USER_REGISTRATION], abiMap[Contracts.USER_REGISTRATION])
.connect(opportunityService.getSignersInterface())
.functions
.registerNewUser(universalAddress)
.then(value => {
    console.log('1')
    console.log(value)
    return true;
})
.catch(error => {
    console.log('2')
    console.log(error)
    return false;
})
}

export default registerNewUser;