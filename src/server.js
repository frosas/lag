/* eslint-env node */

const express = require('express');
const compression = require('compression');

const app = express();
app.use(compression());
app.use(express.static(__dirname + '/../public', { // eslint-disable-line
    maxAge: 365 /* days */ * 24 * 60 * 60 * 1000,
}));
app.listen(process.env.PORT || 5000);
