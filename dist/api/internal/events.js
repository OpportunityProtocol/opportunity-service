import { ExchangeEvents, MarketEvents, UserEvents, WhisperEvents } from "../../constants";
export default {
    'NewPrivateWhisperMessage': WhisperEvents.NewPrivateWhisperMessage,
    'NewPublicWhisperMessage': WhisperEvents.NewPublicWhisperMessage,
    'ChatError': WhisperEvents.ChatError,
    'WorkRelationshipCreated': ExchangeEvents.WorkRelationshipCreated,
    'MarketCreated': MarketEvents.MarkedCreated,
    'MarketDestroyed': MarketEvents.MarketDestroyed,
    'UserRegistered': UserEvents.UserRegistered,
    'UserSummaryCreated': UserEvents.UserSummaryCreated,
    'UserAssignedTrueIdentification': UserEvents.UserAssignedTrueIdentification,
    'UserSummaryUpdated': UserEvents.UserSummaryUpdated
};
//# sourceMappingURL=events.js.map