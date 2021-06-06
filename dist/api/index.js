"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const complete_relationship_1 = require("./exchange/complete-relationship");
const create_task_1 = require("./exchange/create-task");
const enter_work_relationship_1 = require("./exchange/enter-work-relationship");
const create_market_1 = require("./market/create-market");
function generateAPI() {
    return {
        exchange: {
            completeRelationship: complete_relationship_1.completeRelationship,
            createTask: create_task_1.createTask,
            enterWorkRelationship: enter_work_relationship_1.enterWorkRelationship
        },
        dispute: {},
        identity: {},
        markets: {
            createMarket: create_market_1.createMarket,
        },
    };
}
const opportunityAPI = generateAPI();
exports.default = opportunityAPI;
//# sourceMappingURL=index.js.map