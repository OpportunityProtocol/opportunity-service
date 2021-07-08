import { Contract, Transaction } from 'ethers';
import opportunityService from '../../OpportunityService';
import { Contracts } from '../../constants';

import * as addressMap from '../../blockchain/addresses.json';
import * as abiMap from '../../blockchain/abi.json';
import { Result } from 'ethers/lib/utils';

async function registerNewUser(universalAddress) {
    console.log('Starting service api')
    console.log(opportunityService.getSignersInterface())
    console.log(addressMap[Contracts.UserRegistration])
    console.log(abiMap[Contracts.UserRegistration])
console.log('making call')
const txResult = new Contract(addressMap[Contracts.UserRegistration], abiMap[Contracts.UserRegistration])
.connect(opportunityService.getSignersInterface())
.functions.registerNewUser(universalAddress);
    console.log('@@@@@@: ')
    console.log(txResult)

    txResult.then(value => {
        console.log('1')
        console.log(value)
        return {
            address: value,
            status: true
        }
    }, value => {
        console.log('2')
        console.log(value)
        return {
            address: value,
            status: false,
        }
    })
    .catch(err => {
        console.log('3')
        console.log(err)
        return {
            address: err,
            status: false
        }
    })
}

export default registerNewUser;