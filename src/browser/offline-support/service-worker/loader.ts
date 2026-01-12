import EventEmitter from "eventemitter3"

type ConstructorParams = {
  url: string
}

export default class ServiceWorkerLoader {
  readonly events = new EventEmitter()
  private _statusCode = "INITIALIZING"
  private _statusMessage = "initializing..."

  constructor({ url }: ConstructorParams) {
    if (!navigator.serviceWorker) {
      this._setStatus("ERROR", "not supported")
      return
    }

    if (navigator.serviceWorker.controller) {
      this._setStatus("READY", "ready")
    }

    void (async () => {
      try {
        await navigator.serviceWorker.register(url, {
          scope: "..",
          type: "module",
        })
        if (navigator.serviceWorker.controller) {
          this._setStatus("READY", "ready")
        } else {
          // With a reload the service worker will take control of the page and
          // it will cache the page resources.
          this._setStatus("WARNING", "reload required")
        }
      } catch (error) {
        this._setStatus("ERROR", String(error))
      }
    })()
  }

  private _setStatus(code: string, message: string) {
    this._statusCode = code
    this._statusMessage = message
    this.events.emit("change")
  }

  get statusCode() {
    return this._statusCode
  }

  get statusMessage() {
    return this._statusMessage
  }
}
