import { EventEmitter } from "events";
import get from "lodash-es/get";
import Ping from "./Ping";

export default class Pings {
  public readonly events = new EventEmitter();
  public readonly interval = 1000; /* ms */ // How often pings are created
  private readonly _all: Ping[] = [];
  private _max = 100;
  private _lastRespondedPing: Ping;

  constructor() {
    this._pingRepeatedly();
  }

  get all() {
    return this._all;
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

  private _getFirstOfTheLastUnrespondedPings() {
    let first;
    for (let i = this._all.length - 1; i >= 0; i -= 1) {
      if (this._all[i].end) break;
      first = this._all[i];
    }
    return first;
  }

  private _ping() {
    this._removePingsOverLimit();
    this._addPing();
  }

  private _pingRepeatedly() {
    this._ping();
    setTimeout(this._pingRepeatedly.bind(this), this.interval);
  }

  // TODO Clean up this cruft
  private _removePingsOverLimit() {
    // Don't remove the first of the last unresponded ping, otherwise the lag
    // won't be bigger than the one for the first ping in the list!
    const firstOfTheLastUnrespondedPings = this._getFirstOfTheLastUnrespondedPings();
    let firstOfTheLastUnrespondedPingsWasRemoved;
    while (this._all.length > this._max) {
      const ping = this._all.shift();
      if (!ping) continue;
      if (
        firstOfTheLastUnrespondedPings &&
        ping === firstOfTheLastUnrespondedPings
      ) {
        firstOfTheLastUnrespondedPingsWasRemoved = true;
      } else {
        ping.abort();
      }
    }
    if (
      firstOfTheLastUnrespondedPings &&
      firstOfTheLastUnrespondedPingsWasRemoved
    ) {
      this._all.unshift(firstOfTheLastUnrespondedPings);
    }
  }

  private _addPing() {
    const ping = new Ping();
    ping.events.on("pong", () => {
      if (this._isLastRespondedPing(ping)) this._lastRespondedPing = ping;
    });
    this._all.push(ping);
    this.events.emit("add", ping);
  }

  private _isLastRespondedPing(ping: Ping) {
    return (
      !this._lastRespondedPing || this._lastRespondedPing.start < ping.start
    );
  }
}
