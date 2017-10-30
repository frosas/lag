import Events from "events";
import Request from "./ping/request";

export default class Ping {
  constructor() {
    this.events = new Events();
    this.done = false; // Whether it has finished (whether succesfully or not)
    this.failed = false; // Whether it finished failing
    this.start = Date.now();
    this._request = new Request();
    this._request.loaded.then(() => this._onPong(), () => this.abort());
  }

  get lag() {
    return (this.end || Date.now()) - this.start;
  }

  /**
   * Cancels the ping
   */
  abort() {
    if (this.done) return;
    this._request.abort();
    this.done = true;
    this.failed = true;
  }

  toString() {
    const start = new Date(this.start).toLocaleTimeString();
    const status = this.done
      ? this.failed ? "failed" : "succeeded"
      : "running";
    return `Ping started at ${start} (${status})`;
  }

  _onPong() {
    this.done = true;
    this.end = Date.now();
    this.events.emit("pong");
  }
}
