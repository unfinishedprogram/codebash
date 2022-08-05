use std::net::SocketAddr;

use futures_util::{SinkExt, StreamExt};
use tokio::net::{TcpListener, TcpStream};
use log::*;
use tokio_tungstenite::{accept_async};
use tokio_tungstenite::tungstenite::{Result, Error, Message};
use serde::{Deserialize, Serialize};
use types::ClientMessages;

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
    // Main receiving loop.
    // Receives the message and just send it back.
    while let Some(msg) = ws_stream.next().await {
        let msg = msg?;
        if msg.is_text() {
            println!("> {}", msg);
            let client_message: ClientMessages = serde_json::from_str(msg.to_string().as_str()).unwrap();
            match client_message {
                ClientMessages::ChatMessage(_) => println!("Received ConnectionPayload"),
            }
            println!("Message received: {:?}", client_message);
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