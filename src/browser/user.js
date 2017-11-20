import Events from "events";

// User won't notice lower intervals than these
const MAX_READ_INTERVAL = 250; // msecs

export default class {
  constructor() {
    this.events = new Events();

    this._triggerViewEventPeriodically();

    // requestanimationframe() is not always triggered when the tab is not
    // active. Here we ensure it is called often enough
    setInterval(() => this._triggerReadEventIfNeeded(), MAX_READ_INTERVAL);

    setInterval(() => this.events.emit("hear"), 250);
  }

  _triggerViewEventPeriodically() {
    requestAnimationFrame(() => this._triggerViewEventPeriodically());
    this.events.emit("view");
    this._triggerReadEventIfNeeded();
  }

  _triggerReadEventIfNeeded() {
    const now = Date.now();
    if (!this._lastRead || now > this._lastRead + MAX_READ_INTERVAL) {
      this.events.emit("read");
      this._lastRead = now;
    }
  }
}
