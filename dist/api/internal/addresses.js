import addressMap from '../../blockchain/addresses.json';
export default function getContractAddress(network, contractName) {
    return addressMap[network][contractName];
}
//# sourceMappingURL=addresses.js.map