import * as opportunityService from '../../OpportunityService';
import addressMap from '../../blockchain/addresses.json';
import { EthNetworkID } from 'dvote-js';
import { Contracts } from '../../constants';

export default function getContractAddress(network: EthNetworkID, contractName: Contracts): string {
    return addressMap[network][contractName]
}