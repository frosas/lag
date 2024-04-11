export default class Request {
  readonly loaded: Promise<void>
  private readonly controller = new AbortController()

  constructor() {
    this.loaded = fetch(this.buildUrl(), {
      signal: this.controller.signal,
      redirect: "error", // Better to fail than performing multiple requests
      mode: "cors", // Enable error stack traces
    }).then(() => undefined)
  }

  abort() {
    this.controller.abort()
  }

  private buildUrl(): string {
    // To reduce latency, the request should be sent to a service in the edge (e.g.
    // CloudFlare), and it shouldn't incur a round-trip to the origin server.
    //
    // Also note we use HTTPS. This should make the connection to be upgraded to
    // HTTP/2 which causes the requests to reuse the same connection (thus avoiding
    // the connection handshake at every ping). Also, HTTP caused problems on
    // networks with captive portals (e.g. in many Internet cafes).
    //
    // TODO Is referring to a domain causing the DNS resolution to interfere? Eg, if at a given time
    // the domain can't be resolved, maybe the OS decides to wait for some time before trying to
    // resolve again, causing the pings sent for the time being to fail. Use an IP instead?
    return (
      "https://cdnjs.cloudflare.com/ajax/libs/taskforce/1.0/widget.min.js?" +
      "nocache&" + // Service worker to not bother to cache
      `${Date.now()}` // Browser to not cache
    )
  }
}
