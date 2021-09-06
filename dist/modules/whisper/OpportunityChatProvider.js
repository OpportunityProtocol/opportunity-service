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
exports.opportunityChatProvider = void 0;
const OpportunityEventEmitter_1 = __importDefault(require("../../events/OpportunityEventEmitter"));
class OpportunityChatProvider {
    init(chatHttpServer, chatSocketServer) {
        return __awaiter(this, void 0, void 0, function* () {
            this.ChatHttpServer = chatHttpServer;
            this.ChatSocketServer = chatSocketServer;
            try {
                console.log('Initiating OpportunityChatProvider');
                this.userId = yield this.ChatHttpServer.getUserId();
                const response = yield this.ChatHttpServer.userSessionCheck(this.userId);
                console.log('User ID received: ' + this.userId);
                console.log('Response received: ' + response);
                if (response.error) {
                    return { status: false, username: null };
                    //this.props.history.push(`/`)
                }
                else {
                    /* this.setState({
                       username: response.username
                     });*/
                    console.log('Successfully found username: ' + response.username);
                    console.log('Successfully found a userID: ' + this.userId);
                    this.ChatHttpServer.setLS('username', response.username);
                    this.ChatSocketServer.establishSocketConnection(this.userId);
                    return { status: true, username: response.username };
                }
                //this.setRenderLoadingState(false);
            }
            catch (error) {
                return { status: false, username: null };
                //this.setRenderLoadingState(false);
                //this.props.history.push(`/`)
            }
        });
    }
    getChatList() {
        return this.ChatSocketServer.getChatList(this.userId);
    }
    setChatListResponseListener(data) {
        OpportunityEventEmitter_1.default.on('chat-list-response', data);
    }
    removeChatListResponseListener(data) {
        OpportunityEventEmitter_1.default.removeListener('chat-list-response', data);
    }
}
const opportunityChatProvider = new OpportunityChatProvider();
exports.opportunityChatProvider = opportunityChatProvider;
//# sourceMappingURL=OpportunityChatProvider.js.map