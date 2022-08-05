// THIS CODE WAS AUTO-GENERATED. DO NOT EDIT MANUALLY.



import {ClientMessages} from './enums/ClientMessages';
export type ClientMessagesOf<T> = T extends keyof ClientMessages? ClientMessages[T]: never;
export type ClientMessagesHandler = {
	[key in keyof ClientMessages]: (arg: ClientMessagesOf<key>) => void;
}