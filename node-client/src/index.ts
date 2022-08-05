import WebSocket from "ws";
import { ClientMessagesHandler, } from "../bindings/types";
import { ClientMessages } from "../bindings/ClientMessages";

const handlers: ClientMessagesHandler = {
	ChatMessage: arg => console.log(arg),
}

const ws = new WebSocket('ws://127.0.0.1:9002');

ws.on('open', () => {
	const clientMessages: ClientMessages = {
		'ChatMessage': {message: "message", user_id: "user_id"}
	}
	ws.send(JSON.stringify(clientMessages));
});

ws.on('message', (data) => {
	const message: ClientMessages = JSON.parse(data.toString());
	try {
		const key = Object.keys(message)[0] as keyof ClientMessages;
		handlers[key](message[key]);
	} catch (e) {
		console.log("Message of unknown type: ", data.toString());
	}
});
