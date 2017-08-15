import Events from 'events';

// Here we have a copy of the site in a CDN close to the user.
//
// Note we use HTTPS. On Cloudfront this causes the connection to be upgraded to
// HTTP/2 which causes the requests to reuse the same connection (thus avoiding
// the connection handshake at every ping). Also, HTTP caused problems on networks
// with captive portals (e.g. in many Internet cafes).
//
// Ensure the CDN is configured to not forward query strings to reduce latency.
const URL_ = 'https://d18ks85av1x0pi.cloudfront.net/pong?nocache';

class Request {
  constructor() {
    // TODO Switch to fetch() once it allows cancelling (see
    // https://developer.mozilla.org/en-US/docs/Web/API/FetchController)
    this.loaded = new Promise((resolve, reject) => {
      this._request = new XMLHttpRequest();
      this._request.onreadystatechange = () => {
        if (this._request.readyState == XMLHttpRequest.HEADERS_RECEIVED) {
          // This should be the earliest we know the request succeeded
          resolve();
        }
      };
      this._request.onerror = this._request.onabort = this._request.ontimeout = reject;
      this._request.open('GET', `${URL_}&v=${Date.now()}`, true);
      this._request.send();
    });
  }

  abort() {
    this._request.abort();
  }
}

export default class Ping {
  constructor() {
    this.events = new Events();
    this.done = false; // Whether it has finished (whether succesfully or not)
    this.failed = false; // Whether it finished failing
    this.start = Date.now();
    this._request = new Request();
    this._request.loaded.then(() => this._onPong(), () => this.abort());
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

  _onPong() {
    this.done = true;
    this.end = Date.now();
    this.events.emit('pong');
  }
}
