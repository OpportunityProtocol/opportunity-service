const createClient = require('ipfs-http-client');
import { StorageServiceEvent } from '../../events';
import StorageEventEmitter from './storage-event-emitter';

let client;

function createNewClient(url=process.env.DEFAULT_IPFS_URL) {
    client = createClient(new URL(url));
    StorageEventEmitter.emit(StorageServiceEvent.HOST_CHANGED, url);
}

function addData(data) : string {
    const { cid } = this.client.add(data);
    StorageEventEmitter.emit(StorageServiceEvent.DATA_ADDED);
    return cid;
}

async function getData(cid) : Promise<Object> {
    const decoder = new TextDecoder()
    let content = ''
    for await (const chunk of this.client.cat(cid)) {
        content += decoder.decode(chunk)
    }

    StorageEventEmitter.emit(StorageServiceEvent.DATA_RETRIEVED);

    return content;
}

export { createNewClient, addData, getData, StorageEventEmitter };