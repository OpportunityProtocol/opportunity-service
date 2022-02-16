import { ABI_LIST, Contracts, MarketEvents } from '../../constants'
import * as abiMap from '../../blockchain/abi.json'
import { processMarketCreatedEvent } from './processMarketCreatedLog'
import { processMarketDestroyedEvent } from './processMarketDestroyedEvent'
import opportunityService from '../../OpportunityService'
import { ethers, utils } from 'ethers'
import { hexZeroPad } from '@ethersproject/bytes'
import { decode } from 'node:punycode'
import { processWorkRelationshipCreatedEvent } from './processWorkRelationshipCreated'
import { processDisputeCreated } from './processDisputeCreated'

function processLog(log) {
  processLogEvents(log)
}

function processLogEvents(log) {
  let event = null
  let hash = null
  const { data, topics } = log
  for (var i = 0; i < ABI_LIST.length; i++) {
    var abis = abiMap[ABI_LIST[i].toString()]

    for (const aItem in abis) {
      if (aItem['type'] == 'event') {
        continue
      }
      var signature =
        abis[aItem]['name'] +
        '(' +
        abis[aItem]['inputs']
          .map(function (input) {
            return input.type
          })
          .join(',') +
        ')'

      hash = utils.id(signature)
      if (hash == topics[0]) {
        event = abis[aItem]
        break
      }
    }
  }

<<<<<<< HEAD
  if (event != null) {
    switch (event['name']) {
      case 'MarketCreated':
        console.log('MarketCreatedCase')
        processMarketCreatedEvent(log)
        break
      case 'MarketDestroyed':
        processMarketDestroyedEvent(log)
        break
      case 'WorkRelationshipCreated':
        processWorkRelationshipCreatedEvent(log)
        break
      case 'DisputeCreated':
        processDisputeCreated(log)
      default:
=======
    if (event != null) {
        switch(event['name']) {
            case "MarketCreated":
                processMarketCreatedEvent(log);
                break;
            case "MarketDestroyed":
                processMarketDestroyedEvent(log);
                break;
            case "WorkRelationshipCreated":
                processWorkRelationshipCreatedEvent(log);
                break;
            default:
        }
>>>>>>> ecbd2afe93c6e436f9c7ae3d7e1e62a52a511d69
    }
  } else {
    console.log('Event is null.. exiting processing.')
  }
}

export { processLog, processLogEvents }
