import WebSocket from "ws";
import { ClientMessageType, } from "../bindings/types";
import { ClientMessage } from "../bindings/enums/ClientMessage";
import { Socket } from "./protocolWrapper/socket";
import { handleChatMessage } from "./handlers/chatMessageHandler";
import { ClientMessageHandler } from "./handlers/handlerTypes";
import { Server } from "./protocolWrapper/server";
import { Logger } from "tslog";

const ws = new WebSocket('ws://127.0.0.1:9002');
const socket = new Socket(ws);
const server = new Server(socket, "client");

const handlers: ClientMessageHandler = {
	ChatMessage: (message, socket) => handleChatMessage(message, socket),
	ConnectionPayloadMessage: (arg, ws) => console.log('Connection arrived.')
}

const log: Logger = new Logger({
	name: "messageLogger",
	dateTimePattern: 'hour:minute:second',
	'displayLoggerName': false,
	printLogMessageInNewLine: true,

});

ws.on('open', () => {
	const clientMessages: ClientMessage = {
		'ChatMessage': {message: "message", user_id: "user_id"}
	}
	ws.send(JSON.stringify(clientMessages));
});

ws.on('message', (data) => handleMessage(data));

function handleMessage(data: WebSocket.RawData) {
	const message: ClientMessage = JSON.parse(data.toString());
	try {
		// The element is structured as
		// message = {TypeName: {...}}, where {...} is the data of the type.
		// The first key will be enough - BY CONVENTION - to access the object data.
		// Typescript however, can not be aware of this and will complain.
		// Suppose that the MessageType is either {A : {name: string}} | {B : {password: string}}
		// Since the two types do not intersect, only a third type {A : {...}, B: {...}} would be enough
		// to guarantee that this code can be run.

		// We are working with untrusted data and therefore, we can't trust what is being sent.
		// I'm asking typescript to trust me, and I'm trusting javascript to raise an error if it can't be
		// properly parsed.
		// Since there are no types, we will eventually need to extensive checks to see if all the data is there.
		const key = Object.keys(message)[0] as ClientMessageType;
		const data = (message as any)[key];

        log.info("Message received from the server.", data);
		handlers[key](data, server);
	} catch (e) {
		console.log("Message of unknown type: ", data.toString());
	}

}