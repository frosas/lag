![Screenshot](https://raw.github.com/frosas/lag/master/screenshot.png)

# Development

```bash
$ npm i
$ npm run dev
```

Open http://localhost:8080

# Enabling debugging

In the browser console:

```js
navigator.serviceWorker.controller.postMessage("toggleDebugging");
```
