const express = require('express')
const app = express();
const workerpool = require('workerpool');
const port = 5000;

const pool = workerpool.pool("./Workers.js");

app.get('/blocking', (req, res) => {
    pool.exec("heavyCalculation").then((result) => {
        return res.status(200).json({ success: true, value: result })
    }).catch((err) => {
        return res.status(400).json({ success: false, err })
    }).finally(() => {
        pool.terminate();
    })
})

app.get('/non-blocking', (req, res) => {
    return res.status(200).json({ success: true, message: 'It is Nonblocking route' });
})

app.listen(port, () => {
    console.log(`Application Running on PORT: ${port}`);
})