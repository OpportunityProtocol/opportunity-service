"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sync_with_ethereum_node_1 = require("../events/sync-with-ethereum-node");
const sync_jobs_1 = __importDefault(require("../sync/sync-jobs"));
const sync_markets_1 = __importDefault(require("../sync/sync-markets"));
const complete_relationship_1 = require("./exchange/complete-relationship");
const create_task_1 = require("./exchange/create-task");
const enter_work_relationship_1 = require("./exchange/enter-work-relationship");
const register_new_user_1 = __importDefault(require("./identity/register-new-user"));
const create_market_1 = require("./market/create-market");
const addresses_1 = __importDefault(require("./internal/addresses"));
const abis_1 = __importDefault(require("./internal/abis"));
const index_1 = require("./internal/index");
function generateAPI() {
    return {
        internal: {
            addresses: addresses_1.default,
            abis: abis_1.default,
        },
        exchange: {
            completeRelationship: complete_relationship_1.completeRelationship,
            createTask: create_task_1.createTask,
            enterWorkRelationship: enter_work_relationship_1.enterWorkRelationship
        },
        dispute: {},
        identity: {
            registerNewUser: register_new_user_1.default
        },
        markets: {
            createMarket: create_market_1.createMarket,
        },
        network: {
            sync: {
                syncWithEthereum: sync_with_ethereum_node_1.syncWithEthereumNode,
                syncMarkets: sync_markets_1.default,
                syncJobs: sync_jobs_1.default
            }
        },
        internal: {
            abis: abis_1.default,
            events: index_1.events,
            addresses: addresses_1.default
        }
    };
}
const opportunityAPI = generateAPI();
exports.default = opportunityAPI;
//# sourceMappingURL=index.js.map