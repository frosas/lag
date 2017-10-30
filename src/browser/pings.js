import Ping from "./ping";
import Events from "events";
import get from "lodash-es/get";

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

export default class Pings {
  constructor() {
    this.events = new Events();
    this.interval = 1000; /* ms */ // How often pings are created
    this._list = [];
    this._max = 100;
    this._pingRepeatedly();
  }

  get all() {
    return this._list;
  }

  set max(max) {
    this._max = max;
  }

  get max() {
    return this._max;
  }

  get currentLag() {
    const lastRespondedPingLag = get(this, "_lastRespondedPing.lag", 0);
    const firstOfTheLastUnrespondedPingsLag = get(
      this._getFirstOfTheLastUnrespondedPings(),
      "lag",
      0
    );
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

  _pingRepeatedly() {
    this._ping();
    setTimeout(this._pingRepeatedly.bind(this), this.interval);
  }

  _removePingsOverLimit() {
    // Don't remove the first of the last unresponded ping, otherwise the lag
    // won't be bigger than the one for the first ping in the list!
    const firstOfTheLastUnrespondedPings = this._getFirstOfTheLastUnrespondedPings();
    let firstOfTheLastUnrespondedPingsWasRemoved; // TODO Clean up this cruft
    while (this._list.length > this._max) {
      const ping = this._list.shift();
      if (ping === firstOfTheLastUnrespondedPings) {
        firstOfTheLastUnrespondedPingsWasRemoved = true;
      } else {
        ping.abort();
      }
    }
    if (firstOfTheLastUnrespondedPingsWasRemoved) {
      this._list.unshift(firstOfTheLastUnrespondedPings);
    }
  }

  _abortOldestPingsOverConcurrencyLimit() {
    this._getRunningPings()
      .slice(0, -PINGS_CONCURRENCY_LIMIT)
      .forEach(ping => ping.abort());
  }

  _addPing() {
    const ping = new Ping();
    ping.events.on("pong", () => {
      if (this._isLastRespondedPing(ping)) this._lastRespondedPing = ping;
    });
    this._list.push(ping);
    this.events.emit("add", ping);
  }

  _isLastRespondedPing(ping) {
    return (
      !this._lastRespondedPing || this._lastRespondedPing.start < ping.start
    );
  }
}
