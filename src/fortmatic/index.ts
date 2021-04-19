import Fortmatic from 'fortmatic';
// Works for web3 1.0 and pre-1.0 versions
import Web3 from 'web3';

const fm = new Fortmatic(process.env.FORTMATIC_TEST_API_KEY);
const web3 = new Web3(fm.getProvider());

export { fm, web3 };

