import { ClientMessageOf, ClientMessageType } from "../../bindings/types";
import { Server } from "../protocolWrapper/server";

export type ClientMessageHandler = {
	[key in ClientMessageType]: (arg: ClientMessageOf<key>, ws: Server) => void;
}
