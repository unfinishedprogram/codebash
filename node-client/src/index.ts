import WebSocket from "ws";
import { Message, MessageHandler, MessageTypes } from "../bindings/types";

const handlers: MessageHandler = {
	ConnectionPayloadMessage: arg => console.log(arg),
	HelloWorldMessage: arg => console.log(arg)
}

const ws = new WebSocket('ws://127.0.0.1:9002');

ws.on('open', () => {
	const message: Message<'ConnectionPayloadMessage'> = {
		data: {
			data1: 'hi',
			data2: 123
		},
		message_type: 'ConnectionPayloadMessage'
	}
	ws.send(JSON.stringify(message));
});

function handleMessage<T extends keyof MessageTypes>  (message:Message<T>) {
	const handler = handlers[message.message_type];

	if(!handler){
		console.error("Message received with no match. Broken!");
		console.error(message);
		return;
	}

	handler(message.data);
}

ws.on('message', (data) => {
	const message = parser(data.toString());
	handleMessage(message);
});

// receives some json data
function parser(data: string): Message<keyof MessageTypes> {
	return JSON.parse(data);
}
