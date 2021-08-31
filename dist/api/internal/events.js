"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("../../constants");
exports.default = {
    'NewPrivateWhisperMessage': constants_1.WhisperEvents.NewPrivateWhisperMessage,
    'NewPublicWhisperMessage': constants_1.WhisperEvents.NewPublicWhisperMessage,
    'ChatError': constants_1.WhisperEvents.ChatError,
    'WorkRelationshipCreated': constants_1.ExchangeEvents.WorkRelationshipCreated,
    'MarketCreated': constants_1.MarketEvents.MarkedCreated,
    'MarketDestroyed': constants_1.MarketEvents.MarketDestroyed,
    'UserRegistered': constants_1.UserEvents.UserRegistered,
    'UserSummaryCreated': constants_1.UserEvents.UserSummaryCreated,
    'UserAssignedTrueIdentification': constants_1.UserEvents.UserAssignedTrueIdentification,
    'UserSummaryUpdated': constants_1.UserEvents.UserSummaryUpdated
};
//# sourceMappingURL=events.js.map