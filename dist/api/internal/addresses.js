import addressMap from '../../blockchain/addresses.json';
export default function getContractAddress(network, contractName) {
    console.log(network);
    console.log(contractName);
    console.log(addressMap);
    return addressMap[network][contractName];
}
//# sourceMappingURL=addresses.js.map