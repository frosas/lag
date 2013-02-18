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
        this.script = document.createElement('script')
        this.script.async = true
        this.script.addEventListener('load', _.bind(this.onLoad, this))
        this.start = Date.now()
        this.script.src = 'http://lag.frosas.net/scripts/blank.js?' + this.start
        document.head.appendChild(this.script)
    }

    Ping.prototype.onLoad = function() {
        this.end = Date.now()
        this.trigger('pong')
        this.script.parentNode.removeChild(this.script)
    }

    return Ping
})
