import { EventEmitter } from "events";
import Request from "./ping/request";
import { assertType } from "./util";

export type PingSent = Ping & {
  start: number;
  lag: number;
};

export default class Ping {
  public readonly events = new EventEmitter();
  public done = false; // Whether it has finished (whether succesfully or not)
  public failed = false; // Whether it finished failing
  public start?: number = Date.now();
  public end?: number;
  private _request?: Request;

  constructor() {
    // Send the ping asynchronously in preparation of pinging via a Web Worker
    Promise.resolve().then(() => {
      this._request = new Request();
      this._request.loaded.then(
        () => this._onPong(),
        () => this.abort()
      );
      this.events.emit("sent");
    });
  }

  /** @returns The latest lag or null if the ping hasn't been sent yet */
  get lag(): number | undefined {
    return this.isSent() ? (this.end || Date.now()) - this.start : undefined;
  }

  public isSent(): this is PingSent {
    return (this as PingSent).start !== undefined;
  }

  public assertSent(): PingSent {
    return assertType(this, (ping: Ping): ping is PingSent => ping.isSent());
  }

  /**
   * Cancels the ping
   */
  public abort() {
    if (this.done) return;
    if (this._request) this._request.abort();
    this.done = true;
    this.failed = true;
  }

  public _onPong() {
    this.done = true;
    this.end = Date.now();
    this.events.emit("pong");
  }
}
