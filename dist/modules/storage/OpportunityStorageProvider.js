var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import OrbitDB from 'orbit-db';
import IPFS from 'ipfs';
const operations = ['>', '<', '==', '>=', '<='];
class OpportunityStorageProvider {
    constructor(address) {
        // Create IPFS instance
        this.initIPFSInstance = () => __awaiter(this, void 0, void 0, function* () {
            return yield IPFS.create({ repo: "/opportunity/ipfs" });
        });
        this.initIPFSInstance();
        this.listen(address);
    }
    listen(address = '') {
        this.initIPFSInstance().then((ipfs) => __awaiter(this, void 0, void 0, function* () {
            const orbitdb = yield OrbitDB.createInstance(ipfs);
            // Create / Open a database
            if (address == '') {
                this.db = yield orbitdb.docs('opportunity.database.default');
                console.log(this.db.address);
            }
            else {
                this.db = yield orbitdb.docs(address);
                this.db.load();
            }
            // Listen for updates from peers
            this.db.events.on("replicated", address => {
                console.log(this.db.iterator({ limit: -1 }).collect());
            });
            // Add an entry
            const hash = yield this.db.add("world");
            console.log(hash);
            // Query
            const result = this.db.iterator({ limit: -1 }).collect();
            console.log(JSON.stringify(result, null, 2));
        }));
    }
    /**
    * Returns a Promise that resolves to the multihash of the entry as a String.
    * @param doc
    * @returns
    */
    store(doc) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const hash = yield this.db.put(doc).then(hash => {
                    return hash;
                });
                return hash;
            }
            catch (error) {
                console.log(error);
                return '';
            }
        });
    }
    /**
    * Returns an Array of all Objects that match the given key in their _id field or the field specified by indexBy. If no document with
    * that key exists, this returns an empty array.
    * @param key
    */
    retrieveDoc(key = '', collection) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const docs = yield this.db.get(key);
                return docs;
            }
            catch (error) {
                console.log(error);
                return [];
            }
        });
    }
    retrieveDocsByCollection(collection) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.db.query((doc) => doc[collection] == collection);
        });
    }
    deleteDoc(key) {
        return __awaiter(this, void 0, void 0, function* () {
            const hash = yield this.db.del(key);
        });
    }
}
export default OpportunityStorageProvider;
//# sourceMappingURL=OpportunityStorageProvider.js.map