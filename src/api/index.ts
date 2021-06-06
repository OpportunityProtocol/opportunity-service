import { completeRelationship } from "./exchange/complete-relationship";
import { createTask } from "./exchange/create-task";
import { enterWorkRelationship } from "./exchange/enter-work-relationship";
import { createMarket } from "./market/create-market";

function generateAPI() {
    return {
        exchange: {
            completeRelationship: completeRelationship,
            createTask: createTask,
            enterWorkRelationship: enterWorkRelationship
        },
        dispute: {},
        identity: {},
        markets: {
            createMarket: createMarket,
        },
    }
}

const opportunityAPI = generateAPI();

export default opportunityAPI;