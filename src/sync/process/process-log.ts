import { ABI_LIST, Contracts, MarketEvents } from "../../constants";
import ethrpc from '../../rpc/interface/rpc-interface';
import * as abiMap from '../../blockchain/abi.json';

import  { processMarketCreatedEvent } from './processMarketCreatedLog';
import { processMarketDestroyedEvent } from "./processMarketDestroyedEvent";
/**
 * Retrieves topics and process the approppriate log
 * @param log 
 * 
 *   [{
 *   data: '0x7f9fade1c0d57a7af66ab4ead79fade1c0d57a7af66ab4ead7c2c2eb7b11a91385',
 *   topics: ['0xfd43ade1c09fade1c0d57a7af66ab4ead7c2c2eb7b11a91ffdd57a7af66ab4ead7', '0x7f9fade1c0d57a7af66ab4ead79fade1c0d57a7af66ab4ead7c2c2eb7b11a91385']
 *   logIndex: 0,
 *   transactionIndex: 0,
 *   transactionHash: '0x7f9fade1c0d57a7af66ab4ead79fade1c0d57a7af66ab4ead7c2c2eb7b11a91385',
 *   blockHash: '0xfd43ade1c09fade1c0d57a7af66ab4ead7c2c2eb7b11a91ffdd57a7af66ab4ead7',
 *   blockNumber: 1234,
 *   address: '0xde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe'
 *   },{...}]
 */
function processLog(log) {
    processLogEvents(log);
}

function processLogEvents(log) {
    const topics = log.topics;
    let event = null;
    let abi = null;

    for (var i = 0; i < ABI_LIST.length; i++) {
        var abi = abiMap[Contracts[ABI_LIST[i]]];
        for (const abiItem in abi) {
            if (abiItem.type != "event") { continue; };
            var signature = abiItem.name + "(" + abiItem.inputs.map(function (input) { return input.type; }).join(",") + ")";

            var hash = ethrpc.eth.sha3(signature);
            if (hash == topics[0]) {
                event = abiItem;
                break;
            }
        }
    }

    if (event != null && abi != null) {
        var inputs = event.inputs.map(function (input) { return input.type; });
        
        let decodedEventData = ethrpc.eth.abi.decodeParameters(inputs, abi);

        switch(decodedEventData[0]) {
            case "MarketCreated":
                processMarketCreatedEvent(decodedEventData);
                break;
            case "MarketDestroyed":
                processMarketDestroyedEvent(decodedEventData);
                break;
            default:
        }
    }
}

export { processLog, processLogEvents };