/* eslint-env node, es6 */

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
    
module.exports = class Pings {
    constructor() {
        _.extend(this, Backbone.Events);
        
        this.interval = 1000;/* msecs */ // How often pings are created
        this._list = [];
        this._max = 100;
        this._lastRespondedPing;

        this._ping(); // Start pinging ASAP
        realtimeSetInterval(this._ping.bind(this), this.interval);
    }
    
    all() { return this._list; }
    
    setMax(max) { this._max = max; }
    
    max() { return this._max; }

    currentLag() {
        var lastRespondedPingLag = this._lastRespondedPing ? this._lastRespondedPing.lag() : 0;
        var firstOfTheLastUnrespondedPingsLag = (() => {
            var ping = this._getFirstOfTheLastUnrespondedPings();
            return ping ? ping.lag() : 0;
        })();
        return Math.max(lastRespondedPingLag, firstOfTheLastUnrespondedPingsLag);
    };

    _getFirstOfTheLastUnrespondedPings() {
        var first;
        for (var i = this._list.length - 1; i >= 0; i--) {
            if (this._list[i].end) break;
            first = this._list[i];
        }
        return first;
    };
        
    _getRunningPings() {
        return this._list.filter(ping => !ping.done);
    };
        
    _ping() {
        this._removePingsOverLimit();                
        this._abortOldestPingsOverConcurrencyLimit();
        this._addPing();
    };
        
    _removePingsOverLimit() {
        var firstOfTheLastUnrespondedPings = this._getFirstOfTheLastUnrespondedPings();
        this._list = _.last(this._list, this._max);
        // Don't remove the first of the last unresponded ping we got, otherwise 
        // the lag won't be bigger than the first ping in the list!
        if (firstOfTheLastUnrespondedPings && !_.contains(this._list, firstOfTheLastUnrespondedPings)) {
            this._list.unshift(firstOfTheLastUnrespondedPings);
        }
    };
        
    _abortOldestPingsOverConcurrencyLimit() {
        _.chain(this._getRunningPings()).initial(PINGS_CONCURRENCY_LIMIT).invoke('abort');
    };
        
    _addPing() {
        var ping = new Ping;
        ping.on('pong', () => {
            if (this._isLastRespondedPing(ping)) this._lastRespondedPing = ping;
            this.trigger('pong', ping);
        });
        this._list.push(ping);
        this.trigger('add', ping);
    };
    
    _isLastRespondedPing(ping) {
        return !this._lastRespondedPing || this._lastRespondedPing.start < ping.start;
    }
};
