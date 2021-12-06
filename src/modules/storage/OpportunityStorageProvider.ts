import OrbitDB from 'orbit-db'
import IPFS from 'ipfs'

import {
    DisputeDoc,
    WorkRelationshipDoc,
    UserSummaryDoc
} from '../../types'

const operations = ['>', '<', '==', '>=', '<=']


class OpportunityStorageProvider {
    private db: any

    constructor(address: string) {
        this.initIPFSInstance()
        this.listen(address)
    }

    // Create IPFS instance
    initIPFSInstance = async () => {
        return await IPFS.create({ repo: "/opportunity/ipfs" });
    };

    listen(address = '') {
        this.initIPFSInstance().then(async ipfs => {
            const orbitdb = await OrbitDB.createInstance(ipfs);
          
            // Create / Open a database
            if (address == '') {
                this.db = await orbitdb.docs('opportunity.database.default');
                console.log(this.db.address)
            } else {
                this.db = await orbitdb.docs(address);
                this.db.load();
            }
          
            // Listen for updates from peers
            this.db.events.on("replicated", address => {
              console.log(this.db.iterator({ limit: -1 }).collect());
            });
          
            // Add an entry
            const hash = await this.db.add("world");
            console.log(hash);
          
            // Query
            const result = this.db.iterator({ limit: -1 }).collect();
            console.log(JSON.stringify(result, null, 2));
          });
    }


    /**
    * Returns a Promise that resolves to the multihash of the entry as a String.
    * @param doc 
    * @returns 
    */
    async store(doc: DisputeDoc | WorkRelationshipDoc | UserSummaryDoc): Promise<string> {
        try {  
            const hash = await this.db.put(doc).then(hash => {
                return hash;
            })

            return hash;
        } catch(error) {
            console.log(error)
            return ''
        }
    }

    /**
    * Returns an Array of all Objects that match the given key in their _id field or the field specified by indexBy. If no document with 
    * that key exists, this returns an empty array.
    * @param key 
    */
    async retrieveDoc(key: string = '', collection: string): Promise<DisputeDoc> | Promise<WorkRelationshipDoc> | Promise<UserSummaryDoc> {
    try {
        const docs = await this.db.get(key)
        return docs
        } catch(error) {
            console.log(error)
            return []
        }
    }

   async retrieveDocsByCollection(collection: string) {
        return await this.db.query((doc) => doc[collection] == collection)
    }

    async deleteDoc(key: string) {
        const hash = await this.db.del(key)
    }
}

export default OpportunityStorageProvider