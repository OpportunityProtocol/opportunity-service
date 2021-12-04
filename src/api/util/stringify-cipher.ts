import EthCrypto from 'eth-crypto'

export function stringifyCypher(cipher) {
    return EthCrypto.cipher.stringify(cipher);
}