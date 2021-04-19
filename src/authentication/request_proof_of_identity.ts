import { civicSip } from './init';

const requestProofOfIdentity = () => civicSip.signup({
    style: 'popup',
    scopeRequest: civicSip.ScopeRequests.PROOF_OF_IDENTITY
});

export { requestProofOfIdentity };