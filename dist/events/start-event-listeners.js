"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.startEventListeners = void 0;
const OpportunityEventEmitter_1 = __importDefault(require("./OpportunityEventEmitter"));
function startEventListeners(eventDictionary, onComplete) {
    for (const eventName in eventDictionary) {
        OpportunityEventEmitter_1.default.subscribeToEvent(eventName, eventDictionary[eventName]);
    }
    onComplete();
}
exports.startEventListeners = startEventListeners;
//# sourceMappingURL=start-event-listeners.js.map