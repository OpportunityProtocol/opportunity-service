import EventEmitter from 'node:events';
import opportunityService from '../../OpportunityService';
import opportunityEventEmitter from '../../events/OpportunityEventEmitter';
import { IHashMap } from '../../types';
import { WhisperEvents } from '../..//constants';

class OpportunityChatProvider {

    private streams: IHashMap;
    private rpcProvider = null;
    private keyPair;
    private channelSymmetricKey;
    private pubKey;
    private eventEmitter: EventEmitter;

    constructor(rpcProvider) {
        this.rpcProvider = rpcProvider;
        this.generateKeys();
        this.eventEmitter = opportunityEventEmitter;
    }

    async generateKeys() {
        this.keyPair = await this.rpcProvider.shh.newKeyPair();
        this.channelSymmetricKey = await this.rpcProvider.shh.generateSymKeyFromPass(process.env.DEFAULT_WHISPER_CHANNEL);
        this.pubKey = await this.rpcProvider.shh.getPublicKey(this.keyPair);
    }

    broadcastPublicMessage(message) {
        this.rpcProvider.shh.post({
            symmKeyID: this.channelSymmetricKey,
            sig: this.keyPair,
            ttl: 60,
            topic: process.env.PUBLIC_WHISPER_TOPIC,
            payload: this.rpcProvider.utils.fromAscii(message),
            powTime: 2,
            powTarget: 2.5
        });
    }

    subscribeToPublicWhispers() {
        // Subscribe to public chat messages
        this.rpcProvider.web3.shh.subscribe("messages", {
            minPow: 2.5,
            symKeyID: this.channelSymmetricKey,
            topics: [process.env.PUBLIC_WHISPER_TOPIC],
        }).on('data', (data) => {
            // Display message in the UI
            opportunityEventEmitter.emit(WhisperEvents.NewPublicWhisperMessage, data.sig, this.rpcProvider.web3.utils.toAscii(data.payload));
        }).on('error', (err) => {
            //error - could ot decode message
        });

    }

    broadcastPrivateMessage(message, publicKey, requesterAddress, workerAddress) {
        this.rpcProvider.shh.post({
            symmKeyID: publicKey,
            sig: this.keyPair,
            ttl: 60,
            topic: this.retrievePublicKeyTopic(requesterAddress, workerAddress),
            payload: this.rpcProvider.utils.fromAscii(message),
            powTime: 2,
            powTarget: 2.5
        });
    }

    retrievePublicKeyTopic = (requesterAddress, workerAddress) => {
        return '0x';
    }

    subscribePrivateStream(requesterAddress, workerAddress) {
        this.rpcProvider.web3.shh.subscribe("messages", {
            minPow: 2.5,
            privateKeyID: this.keyPair,
            topics: [this.retrievePublicKeyTopic(requesterAddress, workerAddress)],
        })
            .on('data', data => {
                opportunityEventEmitter.emit(WhisperEvents.NewPrivateWhisperMessage, data.timestamp, data.sig, this.rpcProvider.utils.toAscii(data.payload), true);
                this.streams[data.recipientPublicKey] = true;
            })
            .on('error', err => {
                opportunityEventEmitter.emit(WhisperEvents.ChatError, err.message)
            })

        return {
            unsubscribe: () => {
                this.unsubscribePrivateStream();
            }
        }
    }

    unsubscribePrivateStream() {
        opportunityEventEmitter.unsubscribeFromListener(WhisperEvents.NewPrivateWhisperMessage, console.log)
    }
}

const opportunityChatProvider = new OpportunityChatProvider(opportunityService.getDefaultProviderInterface());
export { opportunityChatProvider };