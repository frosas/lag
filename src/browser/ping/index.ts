import { EventEmitter } from "events";
import Request from "./web-worker-request";
import { assertType } from "../util";

export type PingSent = Ping & {
  start: number;
  lag: number;
};

type ConstructorParams = {
  webWorkerUrl: string;
};

export default class Ping {
  public readonly events = new EventEmitter();
  public done = false; // Whether it has finished (whether succesfully or not)
  public failed = false; // Whether it finished failing
  public start?: number = Date.now();
  public end?: number;

  constructor({ webWorkerUrl }: ConstructorParams) {
    const request = new Request({ workerUrl: webWorkerUrl });
    request.events.on("requested", ({ time }) => {
      this.start = time;
      this.events.emit("requested");
    });
    request.events.on("responded", ({ time }) => {
      this.done = true;
      this.end = time;
      this.events.emit("responded");
    });
    request.events.on("failed", () => {
      this.done = true;
      this.failed = true;
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
}
