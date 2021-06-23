"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const OpportunityService_1 = __importDefault(require("../OpportunityService"));
const process_log_1 = require("./process/process-log");
function syncJobs(marketAddress) {
    return __awaiter(this, void 0, void 0, function* () {
        //sync Jobs
        yield OpportunityService_1.default.getProviderInterface().getLogs({
            address: '0xbA4251F32a7E2B4cD367bfFB96D126d287A9E5B6',
            fromBlock: 1,
            toBlock: 'latest'
        }).then((logs) => {
            console.log('Found logs.. Processing sync Jobs');
            logs.forEach(log => {
                if (log && Array.isArray(log.topics) && log.topics.length) {
                    process_log_1.processLog(log); // keccashinside here
                }
            });
        })
            .catch(err => {
            console.log('Err on fetching logs from blockchain: ' + err);
        });
    });
}
exports.default = syncJobs;
//# sourceMappingURL=sync-jobs.js.map