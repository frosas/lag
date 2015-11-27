/* eslint-env node */
/* eslint-disable no-console */

const express = require('express');
const compression = require('compression');
const proxy = require('http-proxy');
const fs = require('fs');

const httpPort = process.env.PORT || 5000;
const httpsPort = 5001;

const app = express();
app.use(compression());
app.use(express.static(__dirname + '/../public', { // eslint-disable-line
    maxAge: 365 /* days */ * 24 * 60 * 60 * 1000,
}));

app.listen(httpPort);
console.log('[server] Listening on http://localhost:' + httpPort);

if (process.env.DEV) {
    const key = fs.readFileSync('tmp/key.pem');
    const cert = fs.readFileSync('tmp/cert.pem');
    proxy.createProxyServer({
        target: {host: 'localhost', port: httpPort},
        ssl: {key, cert},
    }).listen(httpsPort);
    console.log('[server] Listening on https://localhost:' + httpsPort);
}
