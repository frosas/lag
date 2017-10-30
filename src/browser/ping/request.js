// Here we have a copy of the site in a CDN close to the user.
//
// Note we use HTTPS. On Cloudfront this causes the connection to be upgraded to
// HTTP/2 which causes the requests to reuse the same connection (thus avoiding
// the connection handshake at every ping). Also, HTTP caused problems on networks
// with captive portals (e.g. in many Internet cafes).
//
// Ensure the CDN is configured to not forward query strings to reduce latency.
const URL_ = "https://d18ks85av1x0pi.cloudfront.net/pong?nocache";

export default class {
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
      this._request.open("GET", `${URL_}&v=${Date.now()}`, true);
      this._request.send();
    });
  }

  abort() {
    this._request.abort();
  }
}
