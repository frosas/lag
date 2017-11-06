const util = module.exports;

util.timeout = (duration, promise) =>
  Promise.race([
    promise,
    util.delay(duration).then(() => {
      throw new Error(`Timed out after ${duration} ms`);
    })
  ]);

util.delay = duration => new Promise(resolve => setTimeout(resolve, duration));

/**
 * Resume execution flow on exception throwing
 */
util.resumeOnThrow = callback => {
  try {
    callback();
  } catch (error) {
    setTimeout(() => {
      throw error;
    });
  }
};
