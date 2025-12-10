import EventEmitter from "eventemitter3"

// User won't notice lower intervals than these
const MAX_READ_INTERVAL = 250 // msecs

export default class User {
  readonly events = new EventEmitter()
  private _lastRead?: number

  constructor() {
    this._triggerViewEventPeriodically()

    // requestanimationframe() is not always triggered when the tab is not
    // active. Here we ensure it is called often enough
    setInterval(() => this._triggerReadEventIfNeeded(), MAX_READ_INTERVAL)

    setInterval(() => this.events.emit("hear"), 250)
  }

  private _triggerViewEventPeriodically = () => {
    this.events.emit("view")
    this._triggerReadEventIfNeeded()
    requestAnimationFrame(this._triggerViewEventPeriodically)
  }

  private _triggerReadEventIfNeeded = () => {
    const now = Date.now()
    if (!this._lastRead || now > this._lastRead + MAX_READ_INTERVAL) {
      this.events.emit("read")
      this._lastRead = now
    }
  }
}
