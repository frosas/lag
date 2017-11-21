![Screenshot](https://raw.github.com/frosas/lag/master/screenshot.png)

# Development

```bash
$ npm i
$ PORT=1234 [DEBUG=app:* DEBUG_COLORS=true DEBUG_HIDE_DATE=true] npm run watch
```

Open http://localhost:1234

# Enabling debugging

In the browser console:

```js
navigator.serviceWorker.controller.postMessage('toggleDebugging')
```