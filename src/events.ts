enum AuthenticationServiceEvent {
    USER_REGISTERED='user_registered',
}

enum StorageServiceEvent {
    DATA_ADDED='data_added',
    DATA_RETRIEVED='data_retrieved',
    HOST_CHANGED='host_changed',
    STATUS_CHANGED='status_changed',
}

enum RPCEvent {
    
}

export { StorageServiceEvent, AuthenticationServiceEvent, RPCEvent };