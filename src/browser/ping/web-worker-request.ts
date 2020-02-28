import { EventEmitter } from "events";

type ConstructorParams = {
  workerUrl: string;
};

export default class WebWorkerRequest {
  public readonly events = new EventEmitter();

  constructor({ workerUrl }: ConstructorParams) {
    // TODO Use a single worker
    const worker = new Worker(workerUrl);
    worker.addEventListener("message", event => {
      // TODO Constraint event.data type
      // TODO Handle event types explicitly
      this.events.emit(event.data.type, event.data);
    });
    worker.postMessage({ type: "requested" });
  }
}
