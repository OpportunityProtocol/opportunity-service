"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.opportunityChatProvider = void 0;
class OpportunityChatProvider {
    constructor() {
        this.rpc = null;
        /* constructor(rpc) {
             this.rpc = rpc;
             this.generateKeys();
             this.eventEmitter = opportunityEventEmitter;
         }
     
         async generateKeys() {
             this.keyPair = await rpc.shh.newKeyPair();
             this.channelSymmetricKey = await rpc.shh.generateSymKeyFromPass(process.env.DEFAULT_WHISPER_CHANNEL);
             this.pubKey = await rpc.shh.getPublicKey(this.keyPair);
         }*/
        /*broadcastPublicMessage(message) {
            this.rpc.shh.post({
                symmKeyID: this.channelSymmetricKey,
                sig: this.keyPair,
                ttl: ,
                topic: ,
                payload: this.rpc.utils.fromAscii(message),
                powTime: ,
                powTarget:
            });
        }
    
        broadcastPrivateMessage(message, publicKey) {
            this.rpc.shh.post({
                symmKeyID: publicKey,
                sig: this.keyPair,
                ttl: ,
                topic: ,
                payload: this.rpc.utils.fromAscii(message),
                powTime: ,
                powTarget:
            });
        }
    
        subscribePrivateStream() {
            this.rpc.web3.shh.subscribe("messages", {
                minPow: POW_TARGET,
                privateKeyID: this.keyPair,
                topics: ,
            })
            .on('data', data => {
                opportunityEventEmitter.emit(ChatEvent.NewPrivateMessage, data.timestamp, data.sig, this.rpc.utils.toAscii(data.payload), true);
                this.streams[data.recipientPublicKey] = true;
            })
            .on('error', err => {
                opportunityEventEmitter.emit(ChatEvent.ChatError, err.message)
            })
    
            return {
                unsubscribe: () => {
                    this.unsubscribePrivateStream();
                }
            }
        }
    
        unsubscribePrivateStream() {
            opportunityEventEmitter.unsubscribeFromListener(ChatEvent.NewPrivateMessage, console.log)
        }*/
    }
}
const opportunityChatProvider = new OpportunityChatProvider();
exports.opportunityChatProvider = opportunityChatProvider;
//# sourceMappingURL=OpportunityChatProvider.js.map