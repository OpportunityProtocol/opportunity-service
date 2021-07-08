import EventEmitter from 'node:events';
import opportunityService from '../../OpportunityService';
import opportunityEventEmitter from '../../events/OpportunityEventEmitter';
import { IHashMap } from '../../types';
import { WhisperEvents } from '../..//constants';
import { utils } from 'ethers';

class OpportunityChatProvider {

    private streams: IHashMap;
    private rpcProvider = null;
    private ethersProvider = null;
    private keyPair;
    private channelSymmetricKey;
    private pubKey;
    private eventEmitter: EventEmitter = opportunityEventEmitter;
    private sessions: Map<String, String>; //sessions referenced by the other user's address
    private sessionsData: Object //chat data referenced by the topic
    private currentAccount : string = null;

    constructor(currentAccountIn, ethersProviderIn, rpcProviderIn) {
        this.currentAccount = currentAccountIn;
        this.ethersProvider = ethersProviderIn;
        this.rpcProvider = rpcProviderIn;
        this.generateKeys();
    }

    async initializeNewWhisperSession(workerAddress) {
        //save in sessions map
        const topic = this.retrievePublicKeyTopic(workerAddress);
        this.subscribePrivateStream(workerAddress);
        this.sessions.set(workerAddress, topic);
        this.sessionsData[topic] = {}

        //save in mongodb for persistence

        //return topic
        return topic;
    }

    //loads whisper data from mongodb
    async setWhisperData(sessions, sessionData) {
        this.sessions = sessions;
        this.sessionsData = sessionData;
    }

    async generateKeys() {
        this.keyPair = await this.rpcProvider.shh.newKeyPair();
        this.channelSymmetricKey = await this.rpcProvider.shh.generateSymKeyFromPass(process.env.DEFAULT_WHISPER_CHANNEL);
        this.pubKey = await this.rpcProvider.shh.getPublicKey(this.keyPair);
    }

    getWhisperData() {
        return { sessions: this.sessions, sessionData: this.sessionsData }
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
                this.sessionsData[this.retrievePublicKeyTopic(workerAddress)] = {
                    ...this.sessionsData,
                    [this.currentAccount]: message
                }

        //publish to mongodb
    }

    retrievePublicKeyTopic = (workerAddress) => {
        let stringID = String(this.pubKey + workerAddress)
        return utils.id(stringID).slice(stringID.length - 8);
    }

    subscribePrivateStream(workerAddress) {
        this.rpcProvider.shh
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
                }

                //emit received new private message event
                opportunityEventEmitter.emit(WhisperEvents.NewPrivateWhisperMessage);
                this.sessionsData[this.retrievePublicKeyTopic(workerAddress)] = {
                    ...this.sessionsData,
                    [workerAddress]: this.rpcProvider.utils.toAscii(data.payload)
                }
                this.streams[recipientPublicKey] = true;
            })
            .on('error', error => {
                console.log('subscribePrivateStream: ' + error)
                //opportunityEventEmitter.emit(WhisperEvents.ChatError, err.message)
            })

        //update session data

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

export default OpportunityChatProvider;