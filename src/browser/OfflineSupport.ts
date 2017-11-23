import * as Events from "events";

export default class {
  public readonly events = new Events();
  public enabled: boolean;
  private _status: string;

  constructor() {
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
        await navigator.serviceWorker.register("/scripts/service-worker.js", {
          scope: ".."
        });
      } catch (error) {
        this.status = `${error}`;
      } finally {
        if (navigator.serviceWorker.controller) {
          this.status = "";
        } else {
          // With a reload the service worker will take control of the page and
          // it will cache the page resources.
          this.status = "reload to cache content";
        }
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
