cd ./rs_ws_client &&
cargo test &&
cd ../node-client &&
npm run gentypes &&

GREEN='\033[0;32m'
echo -e "${GREEN}+====================+"
echo -e "${GREEN}| Typegen Successful |"
echo -e "${GREEN}+====================+"