import  ABICoder from '../node_modules/web3-eth-abi/lib/index'

function encodeAsciiToHex(rpc, ascii) {
    return rpc.utils.asciiToHex(ascii);
}

function decodeHexToAscii(rpc, hex) {
    return rpc.utils.hexToAcii(hex);
}

async function retrieveBytecode(address, ethrpc) {
    return ethrpc.eth.getCode(address).then((err, result) => {
        return result;
    }); 
}

export { encodeAsciiToHex, decodeHexToAscii, retrieveBytecode };