import { civicSip } from './init';

const signup = () => civicSip.signup({
    style: 'popup',
    scopeRequest: civicSip.ScopeRequests.BASIC_SIGNUP
});

export { signup };