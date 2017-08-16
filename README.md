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
- Use build hash or ID in all URLs (e.g. /images/foo.png?123)
- Inline styles. See branch `inline-styles`.
- Ditch D3 scale module? It weights a lot for what I use it for.
- With `webpack --watch`, build ID and date are not updated between builds.
- `ag ' TODO '`
- Ditch browsers not supporting ES6. See branch `ditch-non-es6-browsers`. Waiting
  for webpack's UglifyJS plugin to support ES6 (see https://webpack.js.org/plugins/uglifyjs-webpack-plugin/).
- Use https://babeljs.io/docs/plugins/preset-env/?
- Use `debug` module in the browser?
- `bin/server` to use `screen`? This way the outputs from different commands are
  not intertwined
- Update screenshot
- Fix pings being duplicated sometimes ("Inferno normalisation(...): Encountered 
  two children with same key, all keys must be unique within its siblings.")
- Display a "Loading..." while loading the JS (use Inferno on the server side).
- Inform the user when the service worker is update (and suggest reload).
- Watched build process notifications. E.g. inform of webpack being done bundling
  or about failed tests.