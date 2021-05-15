import ethrpc from 'ethrpc';
import { FilterParams } from '../types';
import { processLog } from '../sync/process/process-log';

function getLog(filterParams : FilterParams, onComplete : () => void) {
    ethrpc.getFilterLogs(filterParams, (err, logs) => {
        logs.forEach(log => {
            if (log && Array.isArray(log.topics) && log.topics.length) {
                processLog(log);
            }
        })
    }, onComplete)
}

export { getLog }