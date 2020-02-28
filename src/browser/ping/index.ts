import { EventEmitter } from "events";
import { assertType } from "../util";

export type PingSent = Ping & {
  start: number;
  lag: number;
};

type ConstructorParams = {
  webWorkerUrl: string;
};

let nextId = 0;

export default class Ping {
  public readonly events = new EventEmitter();
  public readonly id = `${nextId++}`;
  public done = false; // Whether it has finished (whether succesfully or not)
  public failed = false; // Whether it finished failing
  public start?: number = Date.now();
  public end?: number;

  constructor({ webWorkerUrl }: ConstructorParams) {
    // TODO Use a single worker
    const worker = new Worker(webWorkerUrl);
    worker.addEventListener("message", event => {
      // TODO Constraint event.data type
      switch (event.data.type) {
        case "requested":
          this.start = event.data.time;
          this.events.emit("requested");
          break;
        case "responded":
          this.done = true;
          this.end = event.data.time;
          this.events.emit("responded");
          break;
        case "failed":
          this.done = true;
          this.failed = true;
          break;
      }
    });
    worker.postMessage({ type: "requested" });
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
