const Events = require('events');

// Here we have a copy of the site in a CDN close to the user. Ensure the
// CDN is configured to not forward query strings to reduce latency.
const URL_ = '//d18ks85av1x0pi.cloudfront.net/scripts/blank.js?nocache';

class Script {
  constructor(url) {
    this._element = document.createElement('script');
    this._element.src = url;
    this.loaded = new Promise((resolve, reject) => {
      this._element.onload = resolve;
      this._element.onerror = reject;
    });
    document.head.appendChild(this._element);
  }

  remove() {
    if (!this._element) return;
    this._element.parentNode.removeChild(this._element);
    this._element = null;
  }
}

class Request {
  constructor() {
    this._script = new Script(`${URL_}&v=${Date.now()}`);
    this._script.loaded.then(() => this._script.remove(), () => this._script.remove());
  }

  abort() {
    this._script.remove();
  }

  get loaded() {
    return this._script.loaded;
  }
}

module.exports = class Ping {
  constructor() {
    this.events = new Events();
    this.done = false; // Whether it has finished (whether succesfully or not)
    this.failed = false; // Whether it finished failing
    this._send();
  }

  get lag() {
    return (this.end || Date.now()) - this.start;
  }

  /**
   * Cancels the ping
   */
  abort() {
    if (this.done) return;
    this._request.abort();
    this.done = true;
    this.failed = true;
  }

  toString() {
    return `Ping started at ${new Date(this.start)}`;
  }

  _send() {
    this.start = Date.now();
    this._request = new Request();
    this._request.loaded.then(() => this._onPong(), () => this.abort());
  }

  _onPong() {
    this.done = true;
    this.end = Date.now();
    this.events.emit('pong');
  }
};
