import * as Events from "events";

export default class {
  public readonly events = new Events();
  public enabled: boolean;
  public status: string;

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
        this._setState({ status: `${error}` });
      } finally {
        if (navigator.serviceWorker.controller) {
          this._setState({ status: "" });
        } else {
          // With a reload the service worker will take control of the page and
          // it will cache the page resources.
          this._setState({ status: "reload to cache content" });
        }
      }
    })();
  }

  private _setState(state: { status: string }) {
    Object.assign(this, state);
    this.events.emit("change");
  }
}
