const util = module.exports;

util.timeout = (duration, promise) => Promise.race([
    promise,
    new Promise((resolve, reject) => setTimeout(
        () => reject(new Error(`Timed out after ${duration} ms`)),
        duration
    )),
]);
