const worker = require('workerpool');

const heavyCalculation = () => {
    let k = 0;
    for (let i = 0; i < 10000000000; i++) {
        k += i;
    }
    return k
}

worker.worker({
    heavyCalculation,
})