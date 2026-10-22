const express = require('express');
const { Worker } = require('worker_threads');
const os = require('os');
const app = express();
const PORT = 4000;

const createThread = () => {
    return new Promise((resolve, reject) => {
        const worker = new Worker('./worker.js', { workerData: { thread_count: os.availableParallelism() } });
        worker.on('message', (data) => {
            resolve(data);
        })
        worker.on('error', (err) => {
            reject(err);
        })
    })
}

app.get('/blocking', async (req, res) => {
    const response = [];
    for (let i = 0; i < os.availableParallelism(); i++) {
        response.push(createThread());
    }
    const data = (await Promise.all(response)).reduce((acc, val) => {
        return acc += val;
    }, 0);
    return res.status(200).json({ success: true, data });
})

app.get('/non-blocking', (req, res) => {
    return res.status(200).json({ success: true, message: 'Non-blocking' });
})

app.listen(PORT, () => {
    console.log(`Application Running on PORT: ${PORT}`);
})