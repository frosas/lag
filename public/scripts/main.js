/* eslint-env node */
/* global console, alert */

var Chart = require('./chart');
var PageTitle = require('./page-title');
var PageIcon = require('./page-icon');
var Pings = require('./pings');
var Title = require('./title');
var User = require('./user');
var Audio_ = require('./audio');
var Controls = require('./controls');

// Error handling
window.onerror = function(message, file, line, column, error) { 
    if (error) console.error('Uncaught error', error);
    alert(error && error.message || error || message);
};

var user = new User;
var pings = new Pings;
new Chart(user, pings);
new PageTitle(user, pings);
new PageIcon(user, pings);
new Title(user, pings);
new Controls(Audio_.create(user, pings));