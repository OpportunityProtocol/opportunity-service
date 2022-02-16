import { FakeTransaction, Transaction, TxData } from 'ethereumjs-tx'
import { Contracts, ContractType } from '../../constants'
import opportunityEventEmitter from '../../events/OpportunityEventEmitter'
import { ParamObject } from '../../types'

import * as abiMap from '../../blockchain/abi.json'
import * as addressMap from '../../blockchain/addresses.json'
import * as bytecodeMap from '../../blockchain/bytecode.json'
import opportunityService from '../../OpportunityService'
import { ethers, ContractFactory, Contract } from 'ethers'
import opportunityStorageProvider from '../../modules/storage/OpportunityStorageProvider'
import { Result } from 'ethers/lib/utils'

const Tx = require('ethereumjs-tx').Transaction

async function createDispute(data): Promise<void> {
  const parsedData = JSON.parse(data)
  const abi = abiMap[Contracts.DISPUTE]

  const complaintMetadataPointer : String = parsedData['complaintMetadataPointer']
  const complaintResponseMetadataPointer : String =
    parsedData['complaintResponseMetadataPointer']
  const relationshipAddress : String = parsedData['relationshipAddress']

  try {
    // The factory we use for deploying contracts
    const disputeContractfactory : ContractFactory = new ContractFactory(
      abi,
      bytecodeMap[Contracts.DISPUTE],
      opportunityService.getSignersInterface(),
    )

    // Deploy an instance of the contract
    const disputeContract : Contract = await disputeContractfactory.deploy(
      relationshipAddress,
      addressMap[opportunityService.getEthNetwork()][Contracts.SCHEDULER],
      complaintMetadataPointer,
      complaintResponseMetadataPointer,
    )
    const txReceipt = await disputeContract.deployTransaction.wait()
  } catch (error) {}
}

export { createDispute }
