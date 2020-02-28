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

let worker: Worker;

export default class Ping {
  public readonly events = new EventEmitter();
  public readonly id = `${nextId++}`;
  public done = false; // Whether it has finished (whether succesfully or not)
  public failed = false; // Whether it finished failing
  public start?: number = Date.now();
  public end?: number;

  constructor({ webWorkerUrl }: ConstructorParams) {
    // TODO Initialize the worker outside of the module?
    worker = worker || new Worker(webWorkerUrl);
    const markAsDone = () => {
      this.done = true;
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      worker.removeEventListener("message", onMessage);
    };
    const onMessage = (event: MessageEvent) => {
      // TODO Constraint event.data type
      if (event.data.pingId !== this.id) return;
      switch (event.data.type) {
        case "requested":
          this.start = event.data.time;
          this.events.emit("requested");
          break;
        case "responded":
          this.end = event.data.time;
          markAsDone();
          this.events.emit("responded");
          break;
        case "failed":
          this.failed = true;
          markAsDone();
          break;
      }
    };
    worker.addEventListener("message", onMessage);
    worker.postMessage({ type: "requested", pingId: this.id });
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
