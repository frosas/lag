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
- Ping from another worker to reduce the chances of measurements being tampered 
  with potential blockings in the main thread event loop.
- Never cancel the first unpongued ping so that we can report the real lag 
- Inform the user about the offline support. "Offline support: (Not supported | 
  Enabling... | Enabled)"
- Include build details in every file (HTML, JS, ...). Publish it it in the page 
  footer.
- For HTTP and HTTPS pings, support more than 6 open connections (e.g. use 
  multiple hostnames)
- Perform multiple type of pings
  - HTTP — Note this may fail on wifis with captive portals
  - HTTPS — Is this any slower than an HTTP ping?
  - HTTP/2 — This should make the connection handshake to not be considered
  - WebSocket — Probably not needed if HTTP/2 is implemented
- Pre-cache all resources to not fail loading them when offline. Anything else 
  apart from the favicons?
- Lint all project *.js
- `reset` has to be executed after running `bin/server`
- Generate paths to watch for every tool (ESLint, Mocha, ...) from a single source
  of truth.
- https://github.com/th0r/webpack-bundle-analyzer
- Use build hash or ID when referring to local resources (e.g. /images/foo.png?123)
- Inline styles. WIP at https://github.com/frosas/lag/compare/inline-styles