/* eslint-env amd */

define(['underscore', 'backbone'], function(_, Backbone) {
    var Ping = function() {
        _.extend(this, Backbone.Events);
        this._send();
    };

    Ping.prototype.lag = function() { 
        return (this.end || Date.now()) - this.start;
    };
    
    Ping.prototype._send = function() {
        // Here we have a copy of the site in a CDN close to the user. Ensure the 
        // CDN is configured to not forward query strings to reduce latency.
        var url = 'http://d18ks85av1x0pi.cloudfront.net/scripts/blank.js';

        this._script = document.createElement('script');
        this._script.async = true;
        this._script.addEventListener('load', this._onLoad.bind(this));
        this.start = Date.now();
        this._script.src = url + '?' + this.start;
        document.head.appendChild(this._script);
    };

    Ping.prototype._onLoad = function() {
        this.end = Date.now();
        this.trigger('pong');
        this._script.parentNode.removeChild(this._script);
    };

    return Ping;
});
