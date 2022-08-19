const raw_handlers = import.meta.glob('./handlers/**/*.ts', { eager: true })

import { state, setState } from "./src/state";
import { IMessageHandlers } from "./types/handlers";

// Removes .ts and ./handlers/ from uri
const handlers = Object.fromEntries(
	Object.entries(raw_handlers as any).map( entry => 
		[entry[0].slice(11, entry[0].length - 3), (entry[1] as any).default]
	)
) as IMessageHandlers;

const validPaths = new Set(Object.keys(handlers));

export default function getHandler(path: keyof IMessageHandlers) {
	if(validPaths.has(path)) return console.error(`Invalid Handler Path: ${path}`);
	return handlers[path];
}

export function handleMessage(path: keyof IMessageHandlers, data:any) {
	getHandler(path)!(data, state, setState);
}
