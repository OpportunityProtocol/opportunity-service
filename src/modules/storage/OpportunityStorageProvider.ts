const IPFS = require('ipfs')
const OrbitDB = require('orbit-db')

import {
    DisputeDoc,
    WorkRelationshipDoc,
    UserSummaryDoc
} from '../../types'

const operations = ['>', '<', '==', '>=', '<=']

const optionsToWrite = {
    // Give write access to the creator of the database
    accessController: {
      type: 'orbitdb', //OrbitDBAccessController
      create: 'true',
      admin: ['*'],
      write: ['*'],
    },
    indexBy: 'collection'
}


class OpportunityStorageProvider {
    private db: any

    constructor(address: string) {
       // this.initIPFSInstance()
        //this.listen(address)
    }
 /*   

    // Create IPFS instance
    initIPFSInstance = async () => {
        return await IPFS.create({ 
            repo: Math.random().toString(), 
            start: true,
  preload: {
    enabled: false,
  },
  EXPERIMENTAL: { pubsub: true },
        });
    };

    listen(address = '') {
        this.initIPFSInstance().then(async ipfs => {
            const orbitdb = await OrbitDB.createInstance(ipfs);
          
            // Create / Open a database
            if (address == '') {
                this.db = await orbitdb.docs('database.default');
                console.log(this.db)
                console.log(this.db.address)
            } else {
          
                if (!this.db?.dbname || this.db?.dbname == '') {
                    console.log('Connecting orbitdb to: ' + address)
                    
                    this.db = await orbitdb.docs(address, {
                        type: 'docstore',
                        accessController: {
                            admin: ['*'],
                            write: ['*']
                        },
                          //indexBy: 'collection'
                    })

                    //await this.db.load();
                }
                console.log(this.db)
            }
          
            // Listen for updates from peers
            this.db.events.on("replicated", address => {
              console.log(this.db.iterator({ limit: -1 }).collect());
            });
          
            // Add an entry
            const hash = await this.db.put({ _id: 0, collection: "hmm"});
            console.log(hash);
          
            // Query
            const result = this.db.iterator({ limit: -1 }).collect();
            console.log(JSON.stringify(result, null, 2));
          });
    }



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
    }*/
}

export default OpportunityStorageProvider