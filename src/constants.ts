export const enum Networks {
    Ropsten='Ropsten',
    Mainnet='Mainnet',
    Rinkeby='Rinkeby'
}

export const enum WorkRelationshipState {
    UNCLAIMED,
    PENDING,
    PENDING_DISPUTE,
    CANCELLED,
    COMPLETED,
    EVALUATING,
    CLAIMED,

}

export const RPC_CONFIGURATION = {
    httpAddresses: [process.env.OpportunityNodeHTTP], // optional, default empty array
    wsAddresses: [], // optional, default empty array
    ipcAddresses: [process.env.OpportunityNodeIPC], // optional, default empty array
    networkID: 3, // optional, used to verify connection to the intended network (blockchain)
    connectionTimeout: 3000, // optional, default 3000
    errorHandler: function (err) { /* out-of-band error */ }, // optional, used for errors that can't be correlated back to a request
  };

  export enum StorageProviders {
    IPFS='ipfs'
  }