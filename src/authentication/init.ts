const civicSip = require('civic-sip-api');
require('dotenv').config()

const civicClient = civicSip.newClient({
    appId: process.env.CIVIC_APP_ID,
    prvKey: process.env.CIVIC_APP_PRIVATE_KEY,
    appSecret: process.env.CIVIC_APP_SECRET,
});

const setExchangeCode = jwtToken => civicClient.exchangeCode(jwtToken)
.then((userData) => {
    // store user data and userId as appropriate
    console.log('userData = ', JSON.stringify(userData, null, 4));
}).catch((error) => {
    console.log(error);
});

export { civicClient, civicSip, setExchangeCode };