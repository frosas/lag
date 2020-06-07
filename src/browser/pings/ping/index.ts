import { EventEmitter } from "events";
import { assertType } from "../../util";

export type PingSent = Ping & {
  start: number;
  lag: number;
};

type ConstructorParams = {
  worker: Worker;
};

let nextId = 0;

export default class Ping {
  readonly events = new EventEmitter();
  readonly id = `${nextId++}`;
  done = false; // Whether it has finished (whether succesfully or not)
  failed = false; // Whether it finished failing
  start?: number = Date.now();
  end?: number;

  constructor({ worker }: ConstructorParams) {
    const markAsDone = () => {
      this.done = true;
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      worker.removeEventListener("message", onMessage);
    };
    const onMessage = (event: MessageEvent) => {
      // TODO Constraint event.data type
      if (event.data.pingId !== this.id) return;
      switch (event.data.type) {
        case "sent":
          this.start = event.data.time;
          this.events.emit("sent");
          break;
        case "pong":
          this.end = event.data.time;
          markAsDone();
          this.events.emit("pong");
          break;
        case "failed":
          this.failed = true;
          markAsDone();
          break;
      }
    };
    worker.addEventListener("message", onMessage);
    worker.postMessage({ type: "sent", pingId: this.id });
  }

  /** @returns The latest lag or null if the ping hasn't been sent yet */
  get lag(): number | undefined {
    return this.isSent() ? (this.end || Date.now()) - this.start : undefined;
  }

  isSent(): this is PingSent {
    return (this as PingSent).start !== undefined;
  }

  // TODO Find a better way to work with PingSent
  assertSent(): PingSent {
    return assertType(this, (ping: Ping): ping is PingSent => ping.isSent());
  }
}
