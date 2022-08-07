import { ChatMessage } from "../../bindings/messageTypes/ClientMessage/ChatMessage";
import { Server } from "../protocolWrapper/server";

export function handleChatMessage(message: ChatMessage, server: Server) {
    if (message.user_id == server.userId) {
        return;
    }
    server.sendChatMessage('Hey!');
    //socket.sendMessage({'ChatMessage': {message: "I hope you are doing fine", user_id: "wsup"}});
}