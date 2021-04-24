import { StorageProviders } from '../../constants';
import { createNewClient, addData, getData, StorageEventEmitter  } from './ipfs-operations';
import { StorageInterface, StorageInterfaceWrapper } from '../../types';

let StorageProvider: StorageInterfaceWrapper<StorageInterface> = function(): void {
    this.provider.currentProvider = StorageProviders.IPFS
    this.provider.changeStorageProvider = function(newProvider : StorageProviders) {
        this.currentProvider = newProvider;
    }
    this.provider.getCurrentProvider = function () {
        return this.provider.currentProvider;
    }
    return this;
}

StorageProvider.IPFS.createNewClient = createNewClient;
StorageProvider.IPFS.addData = addData;
StorageProvider.IPFS.getData = getData;

export { StorageProvider };