
import abiMap from '../../blockchain/abi.json';

function getContractInterface(contract: string) {
    return abiMap[contract]
}

export { getContractInterface }

export default {
    'MarketFactory': abiMap['MarketFactory'],
    'WorkRelationship': abiMap['WorkRelationship'],
    'Market': abiMap['Market'],
    'UserRegistration': abiMap['UserRegistration']
}