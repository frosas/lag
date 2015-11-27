/* eslint-disable no-console */

const proxy = require('http-proxy');
const fs = require('fs');
const config = require('./config');

const proxyServer = proxy.createProxyServer({
    target: {host: 'localhost', port: config.httpPort},
    ssl: {
        key: fs.readFileSync('tmp/key.pem'),
        cert: fs.readFileSync('tmp/cert.pem'),
    },
});

proxyServer.listen(config.httpsPort);
console.log('[HTTPS Proxy] Listening on https://localhost:' + config.httpsPort);
