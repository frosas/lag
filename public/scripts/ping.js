/* eslint-env amd */

define(['underscore', 'backbone', 'jquery'], function(_, Backbone, $) {
    var Ping = function() {
        _.extend(this, Backbone.Events);
        this._send();
    };

    Ping.prototype.lag = function() { 
        return (this.end || Date.now()) - this.start;
    };
    
    Ping.prototype.humaneLag = function () {
        var amount = this.lag();
        var unit = 'ms';
        if (amount > 1000) {
            amount = (amount / 1000).toFixed(1);
            unit = 's';
        }
        return amount + " " + unit;
    };
    
    Ping.prototype.destroy = function () {
        $(this._script).remove();
    };

    Ping.prototype._send = function() {
        var ping = this;
        
        // Here we have a copy of the site in a CDN close to the user. Ensure the 
        // CDN is configured to not forward query strings to reduce latency.
        var url = 'http://d18ks85av1x0pi.cloudfront.net/scripts/blank.js';

        this._script = document.createElement('script');
        this._script.async = true;
        this._script.addEventListener('load', this._onLoad.bind(this));
        this.start = Date.now();
        this._script.src = url + '?' + this.start;
        document.head.appendChild(this._script);
        
        this._timeoutWarningTimeout = setTimeout(function () {
            if (ping._script.parentNode) {
                console.error("A ping started " + ping.humaneLag() + " ago is still loading");
            }
        }, 5 /* mins */ * 60 * 1000);
    };

    Ping.prototype._onLoad = function() {
        this.end = Date.now();
        this.trigger('pong');
        this.destroy();
    };

    return Ping;
});
