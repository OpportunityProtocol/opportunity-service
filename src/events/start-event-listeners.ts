import { EventCallbackDictionary } from "../types";
import opportunityEventEmitter from "./OpportunityEventEmitter";

function startEventListeners(eventDictionary : EventCallbackDictionary, onComplete) {
    for (const eventName in eventDictionary) {
        opportunityEventEmitter.subscribeToEvent(eventName, eventDictionary[eventName]);
    }

    onComplete();
}

export { startEventListeners };