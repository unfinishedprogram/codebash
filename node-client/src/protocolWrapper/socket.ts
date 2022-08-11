import { ClientMessage } from "../../bindings/enums/ClientMessage";

export class Socket {
    constructor(readonly ws: WebSocket) {
    }

    public sendMessage(clientMessage: ClientMessage)  {
        this.ws.send(JSON.stringify(clientMessage));
    }
}