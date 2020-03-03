import { EventEmitter } from "events";

type ConstructorParams = {
  url: string;
};

export default class ServiceWorkerLoader {
  readonly events = new EventEmitter();
  private _statusCode = "INITIALIZING";
  private _statusMessage = "initializing...";

  constructor({ url }: ConstructorParams) {
    if (!navigator.serviceWorker) {
      this.setStatus("ERROR", "not supported");
      return;
    }

    if (navigator.serviceWorker.controller) {
      this.setStatus("READY", "ready");
    }

    (async () => {
      try {
        await navigator.serviceWorker.register(url, {
          scope: ".."
        });
        if (navigator.serviceWorker.controller) {
          this.setStatus("READY", "ready");
        } else {
          // With a reload the service worker will take control of the page and
          // it will cache the page resources.
          this.setStatus("WARNING", "reload required");
        }
      } catch (error) {
        this.setStatus("ERROR", error);
      }
    })();
  }

  setStatus(code: string, message: string) {
    this._statusCode = code;
    this._statusMessage = message;
    this.events.emit("change");
  }

  get statusCode() {
    return this._statusCode;
  }

  get statusMessage() {
    return this._statusMessage;
  }
}
