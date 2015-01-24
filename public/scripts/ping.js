/* eslint-env amd */

define(['underscore', 'backbone', 'jquery'], function(_, Backbone, $) {
    var Ping = function() {
        _.extend(this, Backbone.Events);
        this._send();
    };
    
    /**
     * Whether it has finished (whether succesfully or not)
     * 
     * @type {boolean}
     */
    Ping.prototype.done = false;
    
    /**
     * Whether it finished failing
     * 
     * @type {boolean}
     */
    Ping.prototype.failed = false;

    Ping.prototype.lag = function() { 
        return (this.end || Date.now()) - this.start;
    };
    
    /**
     * Cancels the ping
     */
    Ping.prototype.abort = function () {
        this._request.abort();
        this.done = true;
        this.failed = true;
    };
    
    Ping.prototype.toString = function () {
        return 'Ping started at ' + new Date(this.start);
    };
    
    Ping.prototype._send = function() {
        // Here we have a copy of the site in a CDN close to the user. Ensure the 
        // CDN is configured to not forward query strings to reduce latency.
        var url = 'http://d18ks85av1x0pi.cloudfront.net/scripts/blank.js';
        
        this.start = Date.now();
        this._request = $.ajax({url: url, dataType: 'script'});
        this._request.then(this._onLoad.bind(this));
        
        // TODO Abort ping if request fails
    };

    Ping.prototype._onLoad = function() {
        this.done = true;
        this.end = Date.now();
        this.trigger('pong');
    };

    return Ping;
});
