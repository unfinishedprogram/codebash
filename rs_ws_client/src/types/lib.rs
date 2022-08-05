#![allow(dead_code)]
use ts_rs::TS;
use serde::{Deserialize, Serialize};
use serde_json::Result;

// Servidor - Rust.
// Cliente  - Typescript.

#[derive(TS)]
#[derive(Serialize, Deserialize, Debug)]
#[ts(export, export_to="../node-client/bindings/messageTypes/ClientMessage/")]
pub struct ChatMessage{
    pub user_id: String,
    pub message: String,
}

#[derive(TS)]
#[ts(export, export_to="../node-client/bindings/messageTypes/ClientMessage/")]
#[derive(Serialize, Deserialize, Debug)]
pub struct ConnectionPayloadMessage {
    pub data1: String,
    pub data2: u8,
}

#[derive(Serialize, Deserialize, Debug)]
#[derive(TS)]
#[ts(export, export_to="../node-client/bindings/enums/")]
pub enum ClientMessage {
    ChatMessage(ChatMessage),
    ConnectionPayloadMessage(ConnectionPayloadMessage),
}