const $ = require('jquery');
const Events = require('events');

// Here we have a copy of the site in a CDN close to the user. Ensure the
// CDN is configured to not forward query strings to reduce latency.
const URL_ = '//d18ks85av1x0pi.cloudfront.net/scripts/blank.js?nocache';

module.exports = class Ping {
    constructor() {
        this.events = new Events;
        this.done = false; // Whether it has finished (whether succesfully or not)
        this.failed = false; // Whether it finished failing
        this._send();
    }

    lag() {
        return (this.end || Date.now()) - this.start;
    }

    /**
     * Cancels the ping
     */
    abort() {
        this._request.abort();
        this.done = true;
        this.failed = true;
    }

    toString() {
        return 'Ping started at ' + new Date(this.start);
    }

    _send() {
        this.start = Date.now();
        this._request = $.ajax({url: URL_, dataType: 'script'});
        this._request.then(() => this._onPong(), () => this.abort());
    }

    _onPong() {
        this.done = true;
        this.end = Date.now();
        this.events.emit('pong');
    }
};
