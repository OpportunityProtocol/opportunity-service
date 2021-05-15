import { RPC_CONFIGURATION } from '../constants';

function connectRpc(ethrpc) {
    ethrpc.connect(RPC_CONFIGURATION, function (err) {
        if (err) {
          console.error("Failed to connect to Ethereum node.");
        } else {
          console.log("Connected to Ethereum node.");
        }
      });
}

function disconnectRpc(ethrpc) {
  ethrpc.disconnect();
}

export { connectRpc, disconnectRpc }