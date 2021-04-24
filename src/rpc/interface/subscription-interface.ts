import { SubscriptionInterface } from "../../types";
import { subscribeToEvent, unsubscribeFromEvent } from "../subscriptions/index";

const SubscriptionInterface : SubscriptionInterface = {
    subscribeEvent: subscribeToEvent,
    unsubscribeEvent: unsubscribeFromEvent,
}

export default SubscriptionInterface;