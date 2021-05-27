import EventEmitter from 'node:events';
import opportunityEventEmitter from '../../events/OpportunityEventEmitter';
import rpc from '../../rpc/interface/rpc-interface';
import { IHashMap } from '../../types';

class OpportunityChatProvider {

    private streams : IHashMap;
    private rpc = null;
    private keyPair;
    private channelSymmetricKey;
    private pubKey;
    private eventEmitter : EventEmitter;

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

const opportunityChatProvider = new OpportunityChatProvider();
export { opportunityChatProvider };