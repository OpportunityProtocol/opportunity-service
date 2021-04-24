import opportunityEventEmitter from "../../OpportunityEventEmitter";

// a list for saving subscribed event instances
const subscribedEvents = {};

const generateEventJSONInterface = (abi, eventName) => {
    for (let i = 0; i < abi.length; i++) {
        if (abi[i].type == 'event') {
            if (abi[i].name == eventName) {
                return abi[i]
            }
        }
    }
}

const retrieveContractJSONInterface = (contractName, contractModule) => {
    switch(contractModule) {
        case 'Market':
            const abi = marketAbis[contractName];
            return abi;
        case 'Exchange':
        case 'Disputes':
        case 'User':
    }
}

// subscribe to log event
const subscribeToLogEvent = (contractName, contractModule, eventName, rpc) => {
    const contractABI = retrieveContractJSONInterface(contractName, contractModule);
    const eventJsonInterface = generateEventJSONInterface(contractABI, eventName);
    const contract = rpc.eth.Contract(contractABI);

    const subscription = rpc.eth.subscribe('logs', {
        address: contract.options.address,
        topics: [eventJsonInterface.signature],
    }, (error, result) => {
        if (!error) {
            const eventObj = rpc.eth.abi.decodeLog(
                eventJsonInterface.inputs,
                result.data,
                result.topics.slsice(1)
            )

            //standard logger
        }
    })

    subscribedEvents[eventName] = subscription;
}

const unsubscribeFromLogEvent = (eventName, web3) => {
    const subscription = subscribedEvents[eventName];

    subscription.unsubscribe((error, success) => {
        //standard logger
    })

    delete subscribedEvents[eventName];
}

export { subscribeToLogEvent, unsubscribeFromLogEvent };