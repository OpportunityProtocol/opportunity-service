import { Contracts, ExchangeEvents, MarketEvents } from '../../constants'
import * as abiMap from '../../blockchain/abi.json'
import * as addressMap from '../../blockchain/addresses.json'
import opportunityService from '../../OpportunityService'
import { Contract } from '@ethersproject/contracts'
import { ethers } from 'ethers'
import {
  AbiCoder,
  EventFragment,
  Interface,
  LogDescription,
  Result,
} from '@ethersproject/abi'
import opportunityEventEmitter from '../../events/OpportunityEventEmitter'

/**
 * WorkRelationshipCreated(address owner, address relationship, address market)
 * @param log
 * @returns
 */
function processDisputeCreated(log) {
  try {
    const iface: Interface = new ethers.utils.Interface(
      abiMap[Contracts.DISPUTE],
    )
    const decodedLog: LogDescription = iface.parseLog(log)
    const { args, signature } = decodedLog

    const employer : String = args[0]
    const worker : String = args[1]
    const relationship : String = args[2]
    const disputeAddress : String = args[3]

    const disputeData = {
      employer,
      worker,
      relationship,
      address: disputeAddress,
    }

    opportunityEventEmitter.emit(
      ExchangeEvents.WorkRelationshipCreated,
      disputeData,
    )
  } catch (error) {
    console.log(error)
  }
}

export { processDisputeCreated }
