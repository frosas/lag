import EventEmitter from "eventemitter3"
import Ping, { PingSent } from "./ping"

export const INTERVAL = 1000 // ms

type ConstructorParams = {
  workerUrl: string
}

export default class Pings {
  readonly events = new EventEmitter()
  readonly max = (2 /* minutes */ * 60 * 1000) / INTERVAL
  private readonly _all: PingSent[] = []
  private _lastRespondedPing?: PingSent
  // Pings sent after the last responded one, except redundant failed ones.
  // After a long outage, they may be no longer in the list.
  private _unrespondedPings: PingSent[] = []
  private readonly _worker: Worker

  constructor({ workerUrl }: ConstructorParams) {
    this._worker = new Worker(workerUrl, { type: "module" })
    setInterval(() => this._ping(), INTERVAL)
  }

  get all() {
    return this._all
  }

  get currentLag() {
    return Math.max(
      this._lastRespondedPing?.lag ?? 0,
      this._unrespondedPings[0]?.lag ?? 0,
    )
  }

  private _ping() {
    this._removePingsOverLimit()
    this._addPing()
  }

  private _removePingsOverLimit() {
    while (this._all.length > this.max) this._all.shift()
  }

  private _addPing() {
    const ping = new Ping({ worker: this._worker })
    ping.events.on("pinged", () => {
      const sentPing = ping.assertSent()
      this._all.push(sentPing)
      this._unrespondedPings.push(sentPing)
      this.events.emit("add", ping)
    })
    ping.events.on("ponged", () => {
      this._updateLastRespondedPing(ping.assertSent())
    })
    ping.events.on("failed", () => this._removeRedundantFailedPings())
  }

  // A failed ping won't be responded, so in a run of failed pings only the
  // first one can become the first unresponded ping. Removing the rest stops
  // the unresponded pings from growing during an outage.
  private _removeRedundantFailedPings() {
    this._unrespondedPings = this._unrespondedPings.filter(
      (ping, index, pings) =>
        !(ping.failed && index > 0 && pings[index - 1].failed),
    )
  }

  private _updateLastRespondedPing(ping: PingSent) {
    if (
      !this._lastRespondedPing ||
      this._lastRespondedPing.start < ping.start
    ) {
      this._lastRespondedPing = ping
      this._unrespondedPings = this._unrespondedPings.filter(
        (unrespondedPing) => unrespondedPing.start > ping.start,
      )
    }
  }
}
