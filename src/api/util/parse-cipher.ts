import EthCrypto from 'eth-crypto'

/* >  {
        iv: '02aeac54cb45283b427bd1a5028552c1',
        ephemPublicKey: '044acf39ed83c304f19f41ea66615d7a6c0068d5fc48ee181f2fb1091...',
        ciphertext: '5fbbcc1a44ee19f7499dbc39cfc4ce96',
        mac: '96490b293763f49a371d3a2040a2d2cb57f246ee88958009fe3c7ef2a38264a1'
    } */
export function parseCypher(str) {
    return EthCrypto.cipher.parse(str);
}