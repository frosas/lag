/* eslint-env node */

var Ping = require('./ping');
var realtimeSetInterval = require('./realtime-set-interval');
var _ = require('underscore');
var Backbone = require('backbone');

/**
 * The amount of active pings (i.e. connections) that can run concurrently.
 * 
 * This should solve the problem of the connection being restored after 
 * being offline for a while (thus, there being a lot of open connections), 
 * and new pings not working as the browser already reached the limit 
 * of open connections.
 * 
 * @type {integer}
 */
var PINGS_CONCURRENCY_LIMIT = 20;
    
var Pings = module.exports = function() {
    this._list = [];
    this._max = 100;
    this._lastRespondedPing;

    _.extend(this, Backbone.Events);
    
    this._ping(); // Start pinging ASAP
    realtimeSetInterval(this._ping.bind(this), this.interval);
};

Pings.prototype.interval = 1000;/* msecs */ // How often pings are created

Pings.prototype.all = function () { return this._list; };

Pings.prototype.setMax = function (max) { this._max = max; };

Pings.prototype.max = function () { return this._max; };

Pings.prototype.currentLag = function () {
    var pings = this;
    var lastRespondedPingLag = this._lastRespondedPing ? this._lastRespondedPing.lag() : 0;
    var firstOfTheLastUnrespondedPingsLag = (function() {
        var ping = pings._getFirstOfTheLastUnrespondedPings();
        return ping ? ping.lag() : 0;
    })();
    return Math.max(lastRespondedPingLag, firstOfTheLastUnrespondedPingsLag);
};

Pings.prototype._getFirstOfTheLastUnrespondedPings = function() {
    var first;
    for (var i = this._list.length - 1; i >= 0; i--) {
        if (this._list[i].end) break;
        first = this._list[i];
    }
    return first;
};
    
Pings.prototype._getRunningPings = function () {
    return this._list.filter(function (ping) { return !ping.done; });
};
    
Pings.prototype._removePingsOverLimit = function () {
    this._list = _.last(this._list, this._max);
};
    
Pings.prototype._abortOldestPingsOverConcurrencyLimit = function () {
    _.chain(this._getRunningPings()).initial(PINGS_CONCURRENCY_LIMIT).invoke('abort');
};
    
Pings.prototype._addPing = function () {
    var pings = this;
    var ping = new Ping;
    ping.on('pong', function() {
        if (!pings._lastRespondedPing || pings._lastRespondedPing.start < ping.start) {
            pings._lastRespondedPing = ping;
        }
        
        pings.trigger('pong', ping);
    });
    this._list.push(ping);
    pings.trigger('add', ping);
};
    
Pings.prototype._ping = function () {
    this._removePingsOverLimit();                
    this._abortOldestPingsOverConcurrencyLimit();
    this._addPing();
};