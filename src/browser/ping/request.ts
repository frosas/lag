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
      this._request.open("GET", this._buildUrl(), true);
      this._request.send();
    });
  }

  public abort() {
    this._request.abort();
  }

  private _buildUrl(): string {
    // To reduce latency, the request should be sent to a service in the edge (e.g.
    // CloudFlare), and it shouldn't incur a round-trip to the origin server.
    //
    // Also note we use HTTPS. This should make the connection to be upgraded to
    // HTTP/2 which causes the requests to reuse the same connection (thus avoiding
    // the connection handshake at every ping). Also, HTTP caused problems on
    // networks with captive portals (e.g. in many Internet cafes).
    return (
      "https://cdnjs.cloudflare.com/ajax/libs/taskforce/1.0/widget.min.js?" +
      "nocache&" + // Service worker to not bother to cache
      `${Date.now()}` // Browser to not cache
    );
  }
}
