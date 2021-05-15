const createClient = require('ipfs-http-client');
import { StorageProviderInterface } from '../../types';
import opportunityEventEmitter from '../../events/OpportunityEventEmitter';
import { StorageEvents } from '../../constants';

let client;

function createNewClient(url=process.env.DEFAULT_IPFS_URL) {
    client = createClient(new URL(url));
    opportunityEventEmitter.emit(StorageEvents.HOST_CHANGED, url);
}

function addData(data) : string {
    const { cid } = this.client.add(data);
    opportunityEventEmitter.emit(StorageEvents.DATA_ADDED);
    return cid;
}

async function getData(cid) : Promise<Object> {
    const decoder = new TextDecoder()
    let content = ''
    for await (const chunk of this.client.cat(cid)) {
        content += decoder.decode(chunk)
    }

    opportunityEventEmitter.emit(StorageEvents.DATA_RETRIEVED);

    return content;
}

const IPFSProviderInterface : StorageProviderInterface = {
    createProvider: createNewClient,
    storeData: addData,
    retrieveData: getData
}

export default IPFSProviderInterface;