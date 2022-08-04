#![allow(dead_code)]
use ts_rs::TS;
use serde::{Deserialize, Serialize};
use serde_json::Result;


// Servidor - Rust.
// Cliente  - Typescript.

#[derive(TS)]
#[ts(export)]
#[derive(Serialize, Deserialize)]
pub struct Message<T> {
    pub message_type: String,
    pub data: T 
}

#[derive(TS)]
#[derive(Serialize, Deserialize)]
#[ts(export, export_to="../node-client/bindings/messageTypes/")]
pub struct HelloWorldMessage {
    pub user_id: String,
    pub message: String,
}

#[derive(TS)]
#[ts(export, export_to="../node-client/bindings/messageTypes/")]
pub struct ConnectionPayloadMessage {
    pub data1: String,
    pub data2: u8,
}