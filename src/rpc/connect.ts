import { RPC_CONFIGURATION } from '../constants';

export function connectToRpc(ethrpc) {
    ethrpc.connect(RPC_CONFIGURATION, function (err) {
        if (err) {
          console.error("Failed to connect to Ethereum node.");
        } else {
          console.log("Connected to Ethereum node.");
        }
      });
}