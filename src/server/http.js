/* eslint-disable no-console */

const express = require('express');
const compression = require('compression');
const config = require('./config');
const debug = require('debug')('app:http');

const app = express();
app.use(compression());
app.use(express.static(__dirname + '/../../public', { // eslint-disable-line
    maxAge: 365 /* days */ * 24 * 60 * 60 * 1000,
}));

app.listen(config.httpPort);
debug('Listening on http://localhost:' + config.httpPort);
