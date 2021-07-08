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
const OpportunityEventEmitter_1 = __importDefault(require("../../events/OpportunityEventEmitter"));
const constants_1 = require("../..//constants");
const ethers_1 = require("ethers");
class OpportunityChatProvider {
    constructor(currentAccountIn, ethersProviderIn, rpcProviderIn) {
        this.rpcProvider = null;
        this.ethersProvider = null;
        this.eventEmitter = OpportunityEventEmitter_1.default;
        this.currentAccount = null;
        this.retrievePublicKeyTopic = (workerAddress) => {
            let stringID = String(this.pubKey + workerAddress);
            return ethers_1.utils.id(stringID).slice(stringID.length - 8);
        };
        this.currentAccount = currentAccountIn;
        this.ethersProvider = ethersProviderIn;
        this.rpcProvider = rpcProviderIn;
        this.generateKeys();
    }
    initializeNewWhisperSession(workerAddress) {
        return __awaiter(this, void 0, void 0, function* () {
            //save in sessions map
            const topic = this.retrievePublicKeyTopic(workerAddress);
            this.subscribePrivateStream(workerAddress);
            this.sessions.set(workerAddress, topic);
            this.sessionsData[topic] = {};
            //save in mongodb for persistence
            //return topic
            return topic;
        });
    }
    //loads whisper data from mongodb
    setWhisperData(sessions, sessionData) {
        return __awaiter(this, void 0, void 0, function* () {
            this.sessions = sessions;
            this.sessionsData = sessionData;
        });
    }
    generateKeys() {
        return __awaiter(this, void 0, void 0, function* () {
            this.keyPair = yield this.rpcProvider.shh.newKeyPair();
            this.channelSymmetricKey = yield this.rpcProvider.shh.generateSymKeyFromPass(process.env.DEFAULT_WHISPER_CHANNEL);
            this.pubKey = yield this.rpcProvider.shh.getPublicKey(this.keyPair);
        });
    }
    getWhisperData() {
        return { sessions: this.sessions, sessionData: this.sessionsData };
    }
    broadcastPrivateMessage(message, publicKey, workerAddress) {
        this.rpcProvider.shh.post({
            symmKeyID: publicKey,
            sig: this.keyPair,
            ttl: 60,
            topic: this.retrievePublicKeyTopic(workerAddress),
            payload: this.rpcProvider.utils.fromAscii(message),
            powTime: 2,
            powTarget: 2.5
        });
        //update session data
        this.sessionsData[this.retrievePublicKeyTopic(workerAddress)] = Object.assign(Object.assign({}, this.sessionsData), { [this.currentAccount]: message });
        //publish to mongodb
    }
    subscribePrivateStream(workerAddress) {
        this.rpcProvider.shh;
        this.rpcProvider.shh.subscribe("messages", {
            minPow: 2.5,
            privateKeyID: this.keyPair,
            topics: [this.retrievePublicKeyTopic(workerAddress)],
        })
            .on('data', data => {
            const { timestamp, sig, payload, recipientPublicKey } = data;
            const subscriptionData = {
                timestamp,
                signature: sig,
                payload: this.rpcProvider.utils.hexToAscii(data.payload),
                recipientPublicKey
            };
            //emit received new private message event
            OpportunityEventEmitter_1.default.emit(constants_1.WhisperEvents.NewPrivateWhisperMessage);
            this.sessionsData[this.retrievePublicKeyTopic(workerAddress)] = Object.assign(Object.assign({}, this.sessionsData), { [workerAddress]: this.rpcProvider.utils.toAscii(data.payload) });
            this.streams[recipientPublicKey] = true;
        })
            .on('error', error => {
            console.log('subscribePrivateStream: ' + error);
            //opportunityEventEmitter.emit(WhisperEvents.ChatError, err.message)
        });
        //update session data
        return {
            unsubscribe: () => {
                this.unsubscribePrivateStream();
            }
        };
    }
    unsubscribePrivateStream() {
        OpportunityEventEmitter_1.default.unsubscribeFromListener(constants_1.WhisperEvents.NewPrivateWhisperMessage, console.log);
    }
}
exports.default = OpportunityChatProvider;
//# sourceMappingURL=OpportunityChatProvider.js.map