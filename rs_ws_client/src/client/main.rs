use futures_util::lock::Mutex;
use futures_util::stream::SplitStream;
use tokio_tungstenite::{connect_async, tungstenite::protocol::Message};
use std::io::{self, Write};
use std::sync::{Arc};

use futures_util::{SinkExt, StreamExt};
use tokio::net::{TcpStream};
use tokio_tungstenite::{WebSocketStream, MaybeTlsStream};
use tokio_tungstenite::tungstenite::{Result};

#[tokio::main]
async fn main() {
    let addr = "ws://127.0.0.1:9002";
    let url = url::Url::parse(&addr).unwrap();

    let (ws_stream, _) = connect_async(url).await.expect("Failed to connect");
    let (mut write, read) = ws_stream.split();

    let has_received_message = Arc::new(Mutex::new(true));
    let hc = has_received_message.clone();

    tokio::spawn(async move {
        let has_received_message = has_received_message.clone();

        loop {
            if !*has_received_message.lock().await {
                continue;
            }
            let mut line = String::new();
            print!("> ");
            io::stdout().flush().unwrap();
            std::io::stdin().read_line(&mut line).unwrap();
            let message = Message::Text(line);
            *has_received_message.lock().await = false;
            write.send(message).await.unwrap();

        }
    });

    handle_connection(read, hc).await.unwrap();

}

async fn handle_connection(
    mut read_stream: SplitStream<WebSocketStream<MaybeTlsStream<TcpStream>>>,
    flag: Arc<Mutex<bool>>
) -> Result<()> {
    println!("Listening to new messages.");
    while let Some(msg) = read_stream.next().await {
        let msg = msg?;
        if msg.is_text() {
            println!("Setting status from {} to true", *flag.lock().await);
            println!("server: {}", msg.to_string());
        }
        *flag.lock().await = true;
    };

    Ok(())
}