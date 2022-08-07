import { ClientMessageTypes } from "../../bindings/types";
import { Server } from "../protocolWrapper/server";

export type ClientMessageHandler = {
	[key in keyof ClientMessageTypes]: (arg: ClientMessageTypes[key], ws: Server) => void;
}
