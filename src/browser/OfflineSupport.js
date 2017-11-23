import Events from "events";

export default class {
  constructor() {
    this.events = new Events();
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

  _setState(state) {
    Object.assign(this, state);
    this.events.emit("change");
  }
}
