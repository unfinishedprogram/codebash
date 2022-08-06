import WebSocket from "ws";
import { Message, MessageHandler } from "../bindings/types";

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

ws.on('message', (data) => {
	const newData: Message<keyof MessageHandler> = parser(data.toString());
	const message: = 
	
	caster(newData.message_type, newData.data);
	const handler = handlers[newData.message_type];

	if (!handler) {
		console.error("Message received with no match. Broken!")
		console.error(newData);
		return;
	}
	// This is cursed. I tried my best.
	handler(message as any);
});

// receives some json data
function parser(data: string): Message<any> {
	return JSON.parse(data);
}
