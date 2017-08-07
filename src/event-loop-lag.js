/* eslint-env browser, node */

const Timer = require('./timer');
const util = require('./util');

const eventLoopLag = exports;

const get = async sampleInterval => {
  // TODO Are two calls to getTime() per call to setTimeout() required?
  const timer = new Timer();
  await util.delay(sampleInterval);
  return timer.elapsed - sampleInterval;
};

eventLoopLag.monitor = async ({sampleInterval, callback}) => {
  callback(await get(sampleInterval));
  eventLoopLag.monitor({sampleInterval, callback});
};
