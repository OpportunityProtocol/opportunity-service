export type StorageInterface = {
    provider: object,
    IPFS: object,
}

export type StorageInterfaceWrapper<StorageInterface> = () => void;