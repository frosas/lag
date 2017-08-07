![Screenshot](https://raw.github.com/frosas/lag/master/screenshot.png)

# Development

```bash
$ npm i
$ bin/server
```

Open http://localhost:5000

# Enabling debugging

In the browser console:

```js
navigator.serviceWorker.controller.postMessage('toggleDebugging')
```

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
- Use an existing chart library?
  - http://formidable.com/open-source/victory/
  - http://recharts.org/#/en-US/api/BarChart
- Fix chart memory leak
- Chart to not consume energy when not visible. See https://news.ycombinator.com/item?id=13473859.
- webpack, eslint and mocha watchers to not conflict (changes from one trigger 
  the rest)
- Perform multiple type of pings
  - HTTP — Note this may fail on wifis with captive portals
  - HTTPS — Is this any slower than an HTTP ping?
  - HTTP/2 — This should make the connection handshake to not be considered
  - WebSocket — Probably not needed if HTTP/2 is implemented
- Pre-cache all resources to not fail loading them when offline. Anything else 
  apart from the favicons?
