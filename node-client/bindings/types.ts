// THIS CODE WAS AUTO-GENERATED. DO NOT EDIT MANUALLY.



import {ClientMessage} from './enums/ClientMessage';import {ChatMessage} from './messageTypes/ClientMessage/ChatMessage';
import {ConnectionPayloadMessage} from './messageTypes/ClientMessage/ConnectionPayloadMessage';
export type ClientMessageType = 'ChatMessage' | 'ConnectionPayloadMessage';

export type ClientMessageOf<T> = 
	T extends 'ChatMessage'? ChatMessage : 
	T extends 'ConnectionPayloadMessage'? ConnectionPayloadMessage : 
	never;
export type ClientMessageHandler = {
	[key in ClientMessageType]: (arg: ClientMessageOf<key>) => void;
}