const { workerData, parentPort } = require('worker_threads');

let k = 0;
for (let i = 0; i < 10000000000 / workerData.thread_count; i++) {
    k += i;
}

parentPort.postMessage(k);