import EventEmitter from 'node:events';
import opportunityService from '../../OpportunityService';
import opportunityEventEmitter from '../../events/OpportunityEventEmitter';
import { IHashMap } from '../../types';
import { WhisperEvents } from '../..//constants';

class OpportunityChatProvider {
    userId : string;
    ChatHttpServer : any;
    ChatSocketServer: any;

   async init(chatHttpServer : any, chatSocketServer : any) : Promise<Object> {
       this.ChatHttpServer = chatHttpServer;
       this.ChatSocketServer = chatSocketServer;

       try {
         console.log('Initiating OpportunityChatProvider');
        this.userId = await this.ChatHttpServer.getUserId();
        const response = await this.ChatHttpServer.userSessionCheck(this.userId)

        console.log('User ID received: ' + this.userId);
        console.log('Response received: ' + response);

        if (response.error) {
            return { status: false, username: null }
            //this.props.history.push(`/`)
          } else {
           /* this.setState({
              username: response.username
            });*/
            console.log('Successfully found username: ' + response.username)
            console.log('Successfully found a userID: ' + this.userId);
            this.ChatHttpServer.setLS('username', response.username);
            this.ChatSocketServer.establishSocketConnection(this.userId);
            return { status: true, username: response.username }
          }
          //this.setRenderLoadingState(false);
        } catch (error) {
            return { status: false, username: null }
          //this.setRenderLoadingState(false);
          //this.props.history.push(`/`)
        }
   }

   getChatList() {
    return this.ChatSocketServer.getChatList(this.userId);
   }

   setChatListResponseListener(data) {
     opportunityEventEmitter.on('chat-list-response', data);
   }

   removeChatListResponseListener(data) {
    opportunityEventEmitter.removeListener('chat-list-response', data);
   }
}

const opportunityChatProvider = new OpportunityChatProvider();
export { opportunityChatProvider };