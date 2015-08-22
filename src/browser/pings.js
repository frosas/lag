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
    
module.exports = function() {
    var list = [];
    var max = 100;
    var lastRespondedPing;

    var getFirstOfTheLastUnrespondedPings = function() {
        var first;
        for (var i = list.length - 1; i >= 0; i--) {
            if (list[i].end) break;
            first = list[i];
        }
        return first;
    };
    
    var getRunningPings = function () {
        return list.filter(function (ping) { return !ping.done; });
    };

    var pings = {
        interval: 1000 /* msecs */, // How often pings are created
        all: function() {
            return list;
        },
        setMax: function(_max) {
            max = _max;
        },
        max: function() {
            return max;
        },
        currentLag: function() {
            var lastRespondedPingLag = lastRespondedPing ? lastRespondedPing.lag() : 0;

            var firstOfTheLastUnrespondedPingsLag = (function() {
                var ping = getFirstOfTheLastUnrespondedPings();
                return ping ? ping.lag() : 0;
            })();

            return Math.max(lastRespondedPingLag, firstOfTheLastUnrespondedPingsLag);
        }
    };

    _.extend(pings, Backbone.Events);
    
    var removePingsOverLimit = function () {
        list = _.last(list, max);
    };
    
    var abortOldestPingsOverConcurrencyLimit = function () {
        _.chain(getRunningPings()).initial(PINGS_CONCURRENCY_LIMIT).invoke('abort');
    };
    
    var addPing = function () {
        var ping = new Ping;
        ping.on('pong', function() {
            if (!lastRespondedPing || lastRespondedPing.start < ping.start) {
                lastRespondedPing = ping;
            }

            pings.trigger('pong', ping);
        });
        list.push(ping);
        pings.trigger('add', ping);
    };
    
    var ping = function () {
        removePingsOverLimit();                
        abortOldestPingsOverConcurrencyLimit();
        addPing();
    };
    
    ping(); // Start pinging ASAP
    
    realtimeSetInterval(ping, pings.interval);

    return pings;
};
