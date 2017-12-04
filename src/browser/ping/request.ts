// To reduce latency, the request should be sent to a service in the edge (e.g.
// CloudFlare), and it shouldn't incur a round-trip to the origin server.
//
// Also note we use HTTPS. On Cloudfront this causes the connection to be upgraded
// to HTTP/2 which causes the requests to reuse the same connection (thus avoiding
// the connection handshake at every ping). Also, HTTP caused problems on networks
// with captive portals (e.g. in many Internet cafes).
const URL_ = "https://lag-cdn.frosas.net/pong?nocache";

export default class {
  public readonly loaded: Promise<void>;
  private _request: XMLHttpRequest;

  constructor() {
    // TODO Switch to fetch() once it allows cancelling (see
    // https://developer.mozilla.org/en-US/docs/Web/API/FetchController)
    this.loaded = new Promise((resolve, reject) => {
      this._request = new XMLHttpRequest();
      this._request.onreadystatechange = () => {
        if (this._request.readyState === XMLHttpRequest.HEADERS_RECEIVED) {
          // This should be the earliest we know the request succeeded
          resolve();
        }
      };
      this._request.onerror = this._request.onabort = this._request.ontimeout = reject;
      this._request.open("GET", URL_, true);
      this._request.send();
    });
  }

  public abort() {
    this._request.abort();
  }
}
