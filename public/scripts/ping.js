define(['underscore', 'backbone'], function() {
    var Ping = function() {
        _.extend(this, Backbone.Events)
        this.load()
    }

    Ping.prototype.end = null

    Ping.prototype.lag = function() { 
        return (this.end || Date.now()) - this.start
    }

    Ping.prototype.load = function() {
        // Here we have a copy of the site in a CDN close to the user. Ensure the 
        // CDN is configured to not forward query strings to reduce latency.
        var url = 'http://d18ks85av1x0pi.cloudfront.net/scripts/blank.js'

        this.script = document.createElement('script')
        this.script.async = true
        this.script.addEventListener('load', _.bind(this.onLoad, this))
        this.start = Date.now()
        this.script.src = url + '?' + this.start
        document.head.appendChild(this.script)
    }

    Ping.prototype.onLoad = function() {
        this.end = Date.now()
        this.trigger('pong')
        this.script.parentNode.removeChild(this.script)
    }

    return Ping
})
