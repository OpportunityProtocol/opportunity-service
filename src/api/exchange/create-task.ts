import { FakeTransaction, Transaction, TxData } from 'ethereumjs-tx'
import { Contracts, ContractType } from '../../constants'
import opportunityEventEmitter from '../../events/OpportunityEventEmitter'
import { ParamObject } from '../../types'

import * as abiMap from '../../blockchain/abi.json'
import * as addressMap from '../../blockchain/addresses.json'
import * as bytecodeMap from '../../blockchain/bytecode.json'
import opportunityService from '../../OpportunityService'
import { Contract, ethers } from 'ethers'
import opportunityStorageProvider from '../../modules/storage/OpportunityStorageProvider'
import { Result } from 'ethers/lib/utils'

const Tx = require('ethereumjs-tx').Transaction

async function createTask(data): Promise<void> {
  const parsedData = JSON.parse(data)
  const abi = abiMap[Contracts.MARKET]

  const taskOwner = parsedData['taskOwner']
  const taskMarket = parsedData['taskMarket']
  const taskBounty = Number(parsedData['taskBounty'])
  const taskMetadataPointer = parsedData['taskMetadataPointer']

  if (
    taskOwner == null ||
    taskMarket == 0 ||
    taskBounty == 0 ||
    taskMetadataPointer == ''
  ) {
    throw new Error('Null value in data')
  }

  try {
    const contract : Contract = await new ethers.Contract(taskMarket, abi).connect(
      opportunityService.getSignersInterface(),
    )

    const txResponse = await contract.functions.createJob(
      taskOwner,
      ContractType.NORMAL,
      taskMetadataPointer,
      addressMap[opportunityService.getEthNetwork()]['Dai'],
    )
    const txReceipt = await txResponse.wait()
  } catch (error) {
    console.log('Service: Caught error creating new job: ' + error)
  }
}

export { createTask }