import { EventEmitter } from "events";

// User won't notice lower intervals than these
const MAX_READ_INTERVAL = 250; // msecs

export default class {
  public readonly events = new EventEmitter();
  private lastRead?: number;

  constructor() {
    this._triggerViewEventPeriodically();

    // requestanimationframe() is not always triggered when the tab is not
    // active. Here we ensure it is called often enough
    setInterval(() => this._triggerReadEventIfNeeded(), MAX_READ_INTERVAL);

    setInterval(() => this.events.emit("hear"), 250);
  }

  private _triggerViewEventPeriodically() {
    requestAnimationFrame(() => this._triggerViewEventPeriodically());
    this.events.emit("view");
    this._triggerReadEventIfNeeded();
  }

  private _triggerReadEventIfNeeded() {
    const now = Date.now();
    if (!this.lastRead || now > this.lastRead + MAX_READ_INTERVAL) {
      this.events.emit("read");
      this.lastRead = now;
    }
  }
}
