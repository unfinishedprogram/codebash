use std::net::SocketAddr;

use futures_util::{SinkExt, StreamExt};
use tokio::net::{TcpListener, TcpStream};
use log::*;
use tokio_tungstenite::{accept_async};
use tokio_tungstenite::tungstenite::{Result, Error, Message};
use serde::{Deserialize, Serialize};

use types::{HelloWorldMessage};

async fn accept_connection(peer: SocketAddr, stream: TcpStream) {
    if let Err(e) = handle_connection(peer, stream).await {
        match e {
            Error::ConnectionClosed | Error::Protocol(_) | Error::Utf8 => {},
            err => error!("Error proccessing connection: {}", err),
        }
    }
}

async fn handle_connection(peer: SocketAddr, stream: TcpStream) -> Result<()> {
    let mut ws_stream = accept_async(stream).await.expect("Failed to accept stream");

    info!("New WebSocket connection: {}", peer);

    let hello_message = HelloWorldMessage {
        user_id: "server".to_owned(),
        message: "Welcome to the server".to_owned()
    };

    let wrapper_msg = types::Message {
        message_type: "HelloWorldMessage".to_owned(),
        data: hello_message,
        
    };

    let json = serde_json::to_vec(&wrapper_msg).unwrap();

    let msg: Message = Message::Binary(json);
    ws_stream.send(msg).await?;

    // Main receiving loop.
    // Receives the message and just send it back.
    while let Some(msg) = ws_stream.next().await {
        let msg = msg?;
        if msg.is_text() || msg.is_binary() {
            println!("Message received: {}", msg);
            ws_stream.send(msg).await?;
        }
    }

    Ok(())
}

#[tokio::main]
async fn main() {
    println!("Starting server!");

    let addr = "127.0.0.1:9002";
    let listener = TcpListener::bind(&addr).await.expect("Can't listen.");
    info!("Listening on: {}", addr);

    while let Ok((stream, _)) = listener.accept().await {
        let peer = stream.peer_addr().expect("Connected streams should have a peer address");
        info!("Peer address: {}", peer);

        tokio::spawn(accept_connection(peer, stream));
    }

}