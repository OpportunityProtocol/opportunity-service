import { opportunityConnectionProvider } from "../accounts";
import { completeRelationship } from "./exchange/complete-relationship";
import { createTask } from "./exchange/create-task";
import { enterWorkRelationship } from "./exchange/enter-work-relationship";

function generateAPI() {
    return {
        exchange: {
            completeRelationship: completeRelationship,
            createTask: createTask,
            enterWorkRelationship: enterWorkRelationship
        },
        dispute: {},
        identity: {},
        market: {},
        authentication: opportunityConnectionProvider
    }
}

const opportunityAPI = generateAPI();

export default opportunityAPI;