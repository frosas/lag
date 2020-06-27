export default class Request {
  readonly loaded: Promise<void>;
  private readonly controller = new AbortController();

  constructor() {
    this.loaded = fetch(this.buildUrl(), {
      signal: this.controller.signal,
      redirect: "error", // Better to fail than performing multiple requests
      mode: "cors", // Enable error stack traces
    }).then(() => undefined);
  }

  abort() {
    this.controller.abort();
  }

  private buildUrl(): string {
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
