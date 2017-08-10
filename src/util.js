/* eslint-env browser, node */

const util = module.exports;

util.timeout = (duration, promise) =>
  Promise.race([
    promise,
    util.delay(duration).then(() => {
      throw new Error(`Timed out after ${duration} ms`);
    }),
  ]);

util.delay = duration => new Promise(resolve => setTimeout(resolve, duration));
