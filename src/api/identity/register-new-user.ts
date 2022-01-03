import { Contract, ethers, Transaction } from 'ethers';
import opportunityService from '../../OpportunityService';
import { Contracts } from '../../constants';

import addressMap from '../../blockchain/addresses.json'
import abiMap from '../../blockchain/abi.json'
import { Result } from 'ethers/lib/utils';
import { TransactionResponse } from '@ethersproject/providers';

async function registerNewUser() {
    return new Promise(async (resolve, reject) => {
        try {
            const userRegistrationAddress = addressMap[opportunityService.getEthNetwork()][Contracts.USER_REGISTRATION]
            const userRegistrationInterface = abiMap[Contracts.USER_REGISTRATION]
            const msgSender = await opportunityService.getSignersInterface()._address

            if (typeof msgSender == 'undefined') throw new Error('Message sender is undefined')

            const userRegistrationInstance = new ethers.Contract(userRegistrationAddress, userRegistrationInterface, opportunityService.getProviderInterface())
            const id = await userRegistrationInstance.getTrueIdentification(msgSender)

            if (id == '0x0000000000000000000000000000000000000000')
            {
                const tx : TransactionResponse = await new Contract(
                    addressMap[opportunityService.getEthNetwork()][Contracts.USER_REGISTRATION], abiMap[Contracts.USER_REGISTRATION])
                    .connect(opportunityService.getSignersInterface())
                    .registerNewUser({
                        from: msgSender
                })

                const receipt = await tx.wait()

                if (Number(receipt.status) === 1) {
                    resolve(true);
                } else {
                    resolve(false)
                }
            } else {
                resolve(false)
            }

    
        } catch(error) {
            reject('An error occurred while trying to complete the registration.')
        }
    })
}

export default registerNewUser;