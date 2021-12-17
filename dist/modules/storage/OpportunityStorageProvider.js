const IPFS = require('ipfs');
const OrbitDB = require('orbit-db');
const operations = ['>', '<', '==', '>=', '<='];
const optionsToWrite = {
    // Give write access to the creator of the database
    accessController: {
        type: 'orbitdb',
        create: 'true',
        admin: ['*'],
        write: ['*'],
    },
    indexBy: 'collection'
};
class OpportunityStorageProvider {
    constructor(address) {
        // this.initIPFSInstance()
        //this.listen(address)
    }
}
export default OpportunityStorageProvider;
//# sourceMappingURL=OpportunityStorageProvider.js.map