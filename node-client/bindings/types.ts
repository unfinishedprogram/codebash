// THIS CODE WAS AUTO-GENERATED. DO NOT EDIT MANUALLY.



import {ConnectionPayloadMessage} from './messageTypes/ConnectionPayloadMessage';
import {HelloWorldMessage} from './messageTypes/HelloWorldMessage';
type TypeName = 'ConnectionPayloadMessage' | 'HelloWorldMessage'
type MessageType<T> = 
	T extends 'ConnectionPayloadMessage' ? ConnectionPayloadMessage : 
	T extends 'HelloWorldMessage' ? HelloWorldMessage : 
	never;
export function caster<T extends TypeName>(type: T, element: any): MessageType<T> { return element as MessageType<T>;}
export interface Message<T extends TypeName> {message_type: T, data: MessageType<T>}
export type MessageHandler = {
	[key in TypeName]: (arg: MessageType<key>) => void;
}