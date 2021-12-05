import * as addressMap from '../../blockchain/addresses.json';
export default {
    "rinkeby": {
        'MarketFactory': addressMap['rinkeby']['MarketFactory'],
        'UserRegistration': addressMap['rinkeby']['UserRegistration'],
        'UserSummaryFactory': addressMap['rinkeby']['UserSummaryFactory'],
        'Dai': addressMap['rinkeby']['Dai'],
        'Participation': addressMap['rinkeby']['Participation']
    },
    "mainnet": {
        'MarketFactory': addressMap['mainnet']['MarketFactory'],
        'UserRegistration': addressMap['mainnet']['UserRegistration'],
        'UserSummaryFactory': addressMap['mainnet']['UserSummaryFactory'],
        'Dai': addressMap['mainnet']['Dai'],
        'Participation': addressMap['mainnet']['Participation']
    },
    "xdai": {
        'MarketFactory': addressMap['xdai']['MarketFactory'],
        'UserRegistration': addressMap['xdai']['UserRegistration'],
        'UserSummaryFactory': addressMap['xdai']['UserSummaryFactory'],
        'Dai': addressMap['xdai']['Dai'],
        'Participation': addressMap['xdai']['Participation']
    }
};
//# sourceMappingURL=addresses.js.map