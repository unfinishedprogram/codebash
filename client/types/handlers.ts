import { state, setState } from "../src/state";

type HandlerArgs<D> = [data: D, state: typeof state, setState: typeof setState] 

export interface IMessageData {
	"chat/message": {msg:string, user:string};
}

export type IMessageHandlers = {
	[key in keyof IMessageData]: (...args:HandlerArgs<IMessageData[key]>) => void
}