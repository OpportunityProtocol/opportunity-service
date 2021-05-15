import { StorageProviders } from '../../constants';
import IPFSProviderInterface from './ipfs-operations';
import { StorageInterface, StorageInterfaceWrapper, StorageProviderInterface } from '../../types';

const StorageProvider: StorageInterfaceWrapper<StorageInterface> = function(): void {
    this.provider.currentProvider = null;
    this.provider.interface = null;
    this.provider.changeStorageProvider = function(newProvider : StorageProviders) {
        switch (newProvider) {
            case StorageProviders.IPFS:
                this.currentProvider = StorageProviders.IPFS;
                this.provider.interface = IPFSProviderInterface;
                break;
            default:
        }
    }
    this.provider.getCurrentProvider = function () {
        return this.provider.currentProvider;
    }
    return this;
}

const storageProvider = new StorageProvider();

export default storageProvider;