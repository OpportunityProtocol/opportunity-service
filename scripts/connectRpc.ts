import { connectToRpc } from '../src/rpc/connect';
import { generateRpc } from '../src/rpc/rpc-interface';

connectToRpc(generateRpc(require('ethrpc')))