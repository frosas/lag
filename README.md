![Screenshot](https://raw.github.com/frosas/lag/master/screenshot.png)

# Development

Copy `.env-example` to `.env` and edit it as needed.

```bash
$ npm i
$ npm run watch
$ npm run browser
```

# Enabling debugging

In the browser console:

```js
navigator.serviceWorker.controller.postMessage('toggleDebugging')
```