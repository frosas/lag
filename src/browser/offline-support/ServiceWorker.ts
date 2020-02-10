import { EventEmitter } from "events";

type ConstructorParams = {
  url: string;
};

export default class {
  public readonly events = new EventEmitter();
  public enabled: boolean;
  private _status: string;

  constructor({ url }: ConstructorParams) {
    this.enabled = false;
    this.status = "";

    if (!navigator.serviceWorker) {
      this.status = "not supported";
      return;
    }

    if (navigator.serviceWorker.controller) {
      this.enabled = true;
    } else {
      this.status = "enabling...";
    }

    (async () => {
      try {
        await navigator.serviceWorker.register(url, {
          scope: ".."
        });
        if (navigator.serviceWorker.controller) {
          this.status = "";
        } else {
          // With a reload the service worker will take control of the page and
          // it will cache the page resources.
          this.status = "reload to cache content";
        }
      } catch (error) {
        this.status = `${error}`;
      }
    })();
  }

  set status(status) {
    this._status = status;
    this.events.emit("change");
  }

  get status() {
    return this._status;
  }
}
