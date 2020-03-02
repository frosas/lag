import { EventEmitter } from "events";
import Ping, { PingSent } from "./ping";

export const INTERVAL = 1000; // ms

type ConstructorParams = {
  workerUrl: string;
};

export default class Pings {
  public readonly events = new EventEmitter();
  public readonly max = (2 /* minutes */ * 60 * 1000) / INTERVAL;
  private readonly _all: PingSent[] = [];
  private _lastRespondedPing?: PingSent;
  private readonly _worker: Worker;

  constructor({ workerUrl }: ConstructorParams) {
    this._worker = new Worker(workerUrl);
    setInterval(() => this._ping(), INTERVAL);
  }

  get all() {
    return this._all;
  }

  get currentLag() {
    return Math.max(
      this._lastRespondedPing?.lag ?? 0,
      this._getFirstOfTheLastUnrespondedPings()?.lag ?? 0
    );
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

  // TODO Clean up this cruft
  private _removePingsOverLimit() {
    // Don't remove the first of the last unresponded ping, otherwise the lag
    // won't be bigger than the one for the first ping in the list!
    const firstOfTheLastUnrespondedPings = this._getFirstOfTheLastUnrespondedPings();
    let firstOfTheLastUnrespondedPingsWasRemoved;
    while (this._all.length > this.max) {
      const ping = this._all.shift();
      if (!ping) continue;
      if (
        firstOfTheLastUnrespondedPings &&
        ping === firstOfTheLastUnrespondedPings
      ) {
        firstOfTheLastUnrespondedPingsWasRemoved = true;
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
    const ping = new Ping({ worker: this._worker });
    ping.events.on("requested", () => {
      this._all.push(ping.assertSent());
      this.events.emit("add", ping);
    });
    ping.events.on("responded", () => {
      this._updateLastRespondedPing(ping.assertSent());
    });
  }

  private _updateLastRespondedPing(ping: PingSent) {
    if (
      !this._lastRespondedPing ||
      this._lastRespondedPing.start < ping.start
    ) {
      this._lastRespondedPing = ping;
    }
  }
}
