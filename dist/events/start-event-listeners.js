import opportunityEventEmitter from "./OpportunityEventEmitter";
function startEventListeners(eventDictionary, onComplete) {
    for (const eventName in eventDictionary) {
        opportunityEventEmitter.subscribeToEvent(eventName, eventDictionary[eventName]);
    }
    onComplete();
}
export { startEventListeners };
//# sourceMappingURL=start-event-listeners.js.map