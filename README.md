![Screenshot](https://raw.github.com/frosas/lag/master/screenshot.png)

# Development

```bash
$ npm i
$ npm run watch
```

Open http://localhost:5000

# Enabling debugging

In the browser console:

```js
navigator.serviceWorker.controller.postMessage('toggleDebugging')
```