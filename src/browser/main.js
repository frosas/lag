/* eslint-env node, browser */

(function _setupErrorHandling() {
    var originalOnError = window.onerror || function () {};
    window.onerror = function(message, file, line, column, error) { 
        originalOnError.apply(this, arguments);
        alert(error && error.message || error || message);
    };
})();

var Chart = require('./chart');
var PageTitle = require('./page-title');
var PageIcon = require('./page-icon');
var Pings = require('./pings');
var Title = require('./title');
var User = require('./user');
var Audio_ = require('./audio');
var Controls = require('./controls');

var user = new User;
var pings = new Pings;
new Chart(user, pings);
new PageTitle(user, pings);
new PageIcon(user, pings);
new Title(user, pings);
new Controls(Audio_.create(user, pings));