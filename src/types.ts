export type StorageInterface = {
    provider: object,
    IPFS: object,
}

export type StorageInterfaceWrapper<StorageInterface> = () => void;

export type SubscriptionInterface = {
    subscribeEvent: Function,
    unsubscribeEvent: Function
}