import { ABI_LIST } from "../../constants";
import abiMap from '../../blockchain/abi.json';
import { processMarketCreatedEvent } from './processMarketCreatedLog';
import { processMarketDestroyedEvent } from "./processMarketDestroyedEvent";
import { utils } from "ethers";
import { processWorkRelationshipCreatedEvent } from "./processWorkRelationshipCreated";
import { processDisputeInvolvement } from "./processDisputeInvolvement";
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
    console.log(log);
    processLogEvents(log);
}
function processLogEvents(log) {
    let event = null;
    let hash = null;
    const { data, topics } = log;
    for (var i = 0; i < ABI_LIST.length; i++) {
        var abis = abiMap[ABI_LIST[i].toString()];
        for (const aItem in abis) {
            if (aItem['type'] == "event") {
                continue;
            }
            ;
            var signature = abis[aItem]['name'] + "(" + abis[aItem]['inputs'].map(function (input) { return input.type; }).join(",") + ")";
            hash = utils.id(signature);
            if (hash == topics[0]) {
                event = abis[aItem];
                break;
            }
        }
    }
    if (event != null) {
        switch (event['name']) {
            case "MarketCreated":
                processMarketCreatedEvent(log);
                break;
            case "MarketDestroyed":
                processMarketDestroyedEvent(log);
                break;
            case "WorkRelationshipCreated":
                processWorkRelationshipCreatedEvent(log);
                break;
            case "DisputeInvolvement":
                processDisputeInvolvement(log);
            default:
        }
    }
    else {
        console.log('Event is null.. exiting processing.');
    }
}
export { processLog, processLogEvents };
//# sourceMappingURL=process-log.js.map