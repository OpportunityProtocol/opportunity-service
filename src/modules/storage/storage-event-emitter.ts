const EventEmitter = require('events');
import { StorageServiceEvent } from '../../events';

const StorageEventEmitter = new EventEmitter();

export default StorageEventEmitter;