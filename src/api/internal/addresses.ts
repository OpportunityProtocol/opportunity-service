import opportunityService from '../../OpportunityService'
import * as addressMap from '../../blockchain/addresses.json'

const ethNetwork = opportunityService.getEthNetwork()

export default {
  MarketFactory: addressMap[ethNetwork]['MarketFactory'],
  UserRegistration: addressMap[ethNetwork]['UserRegistration'],
  Dai: addressMap[ethNetwork]['Dai'],
  Scheduler: addressMap[ethNetwork]['Scheduler'],
}
