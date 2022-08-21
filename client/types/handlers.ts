import { state, setState } from "../src/state";

// Argument types for all handlers
type HandlerArgs<T> = [data: T, state: typeof state, setState: typeof setState] 

export interface MessagePayloadTypes {
	"chat/message": {msg:string, user:string};
}

export type MessageHandlers = {
	[key in keyof MessagePayloadTypes]: (...args:HandlerArgs<MessagePayloadTypes[key]>) => void
}