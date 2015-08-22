/* eslint-env node */

var express = require('express');
var compression = require('compression');

var app = express();
app.use(compression());
app.use(express.static(__dirname + '/../public', { // eslint-disable-line
    maxAge: 365 /* days */ * 24 * 60 * 60 * 1000
}));
app.listen(process.env.PORT || 5000);