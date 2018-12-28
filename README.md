![Screenshot](https://raw.github.com/frosas/lag/master/screenshot.png)

# Development

Copy `.env-example` to `.env` and edit it as needed.

```bash
$ npm i
$ npm run watch
```

Open http://localhost:8080

# Enabling debugging

In the browser console:

```js
navigator.serviceWorker.controller.postMessage('toggleDebugging')
```