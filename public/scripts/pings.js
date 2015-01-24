/* eslint-env amd */

define(
    ['ping', 'realtime-set-interval', 'underscore', 'backbone'], 
    function(Ping, realtimeSetInterval, _, Backbone) {
        return function() {
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

            var pings = {
                interval: 1000,
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

            realtimeSetInterval(function() {
                var ping = new Ping;
                ping.on('pong', function() {
                    if (!lastRespondedPing || lastRespondedPing.start < ping.start) {
                        lastRespondedPing = ping;
                    }

                    pings.trigger('pong', ping);
                });
                list.push(ping);
                if (list.length > max) list.shift().destroy();
                pings.trigger('add', ping);
            }, pings.interval);

            return pings;
        };
    }
);