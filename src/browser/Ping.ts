import { EventEmitter } from "events";
import Request from "./ping/request";

export default class Ping {
  public readonly events = new EventEmitter();
  public done = false; // Whether it has finished (whether succesfully or not)
  public failed = false; // Whether it finished failing
  public start = Date.now();
  public end?: number;
  private _request = new Request();

  constructor() {
    this._request.loaded.then(
      () => this._onPong(),
      () => this.abort()
    );
  }

  get lag() {
    return (this.end || Date.now()) - this.start;
  }

  /**
   * Cancels the ping
   */
  public abort() {
    if (this.done) return;
    this._request.abort();
    this.done = true;
    this.failed = true;
  }

  public _onPong() {
    this.done = true;
    this.end = Date.now();
    this.events.emit("pong");
  }
}
