import { Contract, Transaction } from 'ethers';
import opportunityService from '../../OpportunityService';
import { Contracts } from '../../constants';

import * as addressMap from '../../blockchain/addresses.json';
import * as abiMap from '../../blockchain/abi.json';
import { Result } from 'ethers/lib/utils';

async function registerNewUser(universalAddress) {
const txResult = new Contract(addressMap[Contracts.USER_REGISTRATION], abiMap[Contracts.USER_REGISTRATION])
.connect(opportunityService.getSignersInterface())
.functions
.registerNewUser(universalAddress)
.then(value => {
    return true;
})
.catch(error => {
    return false;
})
}

export default registerNewUser;