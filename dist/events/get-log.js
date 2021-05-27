"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLog = void 0;
const ethrpc_1 = __importDefault(require("ethrpc"));
const process_log_1 = require("../sync/process/process-log");
function getLog(filterParams, onComplete) {
    ethrpc_1.default.getFilterLogs(filterParams, (err, logs) => {
        logs.forEach(log => {
            if (log && Array.isArray(log.topics) && log.topics.length) {
                process_log_1.processLog(log);
            }
        });
    }, onComplete);
}
exports.getLog = getLog;
//# sourceMappingURL=get-log.js.map