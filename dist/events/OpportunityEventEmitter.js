"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const events_1 = require("events");
class OpportunityEventEmitter extends events_1.EventEmitter {
    constructor() {
        super();
        this.subscriptions = [];
        this.subscribeToEventOnce = (eventName, callback) => {
            this.once(eventName, callback);
        };
        this.subscribeToEvent = (eventName, callback) => {
            this.on(eventName, callback);
            const id = -1;
            this.addSubscription(id, eventName, callback);
        };
        this.unsubscribeFromAllListeners = () => {
            this.removeAllListeners();
        };
        this.unsubscribeFromListener = (eventName, callback) => {
            this.removeListener(eventName, callback);
        };
        this.setMaxListeners(0);
    }
    addSubscription(id, eventName, callback) { }
    emit(eventName, ...args) {
        return super.emit(eventName, ...args);
    }
}
const opportunityEventEmitter = new OpportunityEventEmitter();
exports.default = opportunityEventEmitter;
//# sourceMappingURL=OpportunityEventEmitter.js.map