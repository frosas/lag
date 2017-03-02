![Screenshot](https://raw.github.com/frosas/lag/master/screenshot.png)

# Development

```bash
$ yarn
$ bin/server
```

Open http://localhost:5000

# TODO

- Testing
- Ping from another thread (use a Web Worker) to reduce the chances of bad 
  measurements because blockings in the main thread.
- Never cancel the first unpongued ping so that we can report the real lag 
- Inform the user about the offline support. "Offline support: (Not supported | 
  Enabling... | Enabled)"
- Include build details in every file (HTML, JS, ...)
- For HTTP and HTTPS pings, support more than 6 open connections (e.g. use 
  multiple hostnames)
- Use http://recharts.org/#/en-US/api/BarChart?
- Fix chart memory leak
- Chart to not consume energy when not visible
- webpack, eslint and mocha watchers to not conflict (changes from one trigger 
  the rest)
- Perform multiple type of pings
  - HTTP — Note this may fail on wifis with captive portals
  - HTTPS — Is this any slower than an HTTP ping?
  - HTTP/2 — This should make the connection handshake to not be considered
  - WebSocket — Probably not needed if HTTP/2 is implemented
- Pre-cache all resources to not fail loading them when offline. Anything else 
  apart from the favicons?