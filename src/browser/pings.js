const Ping = require('./ping');
const _ = require('underscore');
const Events = require('events');

/**
* The amount of active pings (i.e. connections) that can run concurrently.
*
* This should solve the problem of the connection being restored after
* being offline for a while (thus, there being a lot of open connections),
* and new pings not working as the browser already reached the limit
* of open connections.
*
* @type {integer}
*/
const PINGS_CONCURRENCY_LIMIT = 6;

module.exports = class Pings {
  constructor() {
    this.events = new Events();
    this.interval = 1000;/* msecs */ // How often pings are created
    this._list = [];
    this._max = 100;
    this._ping(); // Start pinging ASAP
    setInterval(this._ping.bind(this), this.interval);
  }

  all() {
    return this._list;
  }

  setMax(max) {
    this._max = max;
  }

  max() {
    return this._max;
  }

  currentLag() {
    const lastRespondedPingLag = this._lastRespondedPing ? this._lastRespondedPing.lag() : 0;
    const firstOfTheLastUnrespondedPingsLag = (() => {
      const ping = this._getFirstOfTheLastUnrespondedPings();
      return ping ? ping.lag() : 0;
    })();
    return Math.max(lastRespondedPingLag, firstOfTheLastUnrespondedPingsLag);
  }

  _getFirstOfTheLastUnrespondedPings() {
    let first;
    for (let i = this._list.length - 1; i >= 0; i -= 1) {
      if (this._list[i].end) break;
      first = this._list[i];
    }
    return first;
  }

  _getRunningPings() {
    return this._list.filter(ping => !ping.done);
  }

  _ping() {
    this._removePingsOverLimit();
    this._abortOldestPingsOverConcurrencyLimit();
    this._addPing();
  }

  _removePingsOverLimit() {
    // Don't remove the first of the last unresponded ping, otherwise the lag
    // won't be bigger than the one for the first ping in the list!
    const firstOfTheLastUnrespondedPings = this._getFirstOfTheLastUnrespondedPings();
    while (this._list.length > this._max) {
      const ping = this._list.shift();
      if (ping !== firstOfTheLastUnrespondedPings) ping.abort();
    }
    if (firstOfTheLastUnrespondedPings) this._list.unshift(firstOfTheLastUnrespondedPings);
  }

  _abortOldestPingsOverConcurrencyLimit() {
    _.chain(this._getRunningPings()).initial(PINGS_CONCURRENCY_LIMIT).invoke('abort');
  }

  _addPing() {
    const ping = new Ping();
    ping.events.on('pong', () => {
      if (this._isLastRespondedPing(ping)) this._lastRespondedPing = ping;
    });
    this._list.push(ping);
    this.events.emit('add', ping);
  }

  _isLastRespondedPing(ping) {
    return !this._lastRespondedPing || this._lastRespondedPing.start < ping.start;
  }
};
