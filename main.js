/**
 * @param url It has to be a Javascript file
 */
var ping = function(url, callback) {
    var start = new Date
    $.ajax({
        url: url,
        timeout: 5000,
        dataType: 'script',
        complete: function(xhr, status) {
            var lag = new Date - start
            var error = status in ['error', 'timeout'] ? status : null
            callback(error, {start: start, lag: lag})
        }
    })
}

var pings = (function() {
    var pings = []
    var max = 40
    return {
        add: function(start, lag) {
            pings.push({start: start, lag: lag})
            if (pings.length > max) pings = pings.slice(1)
        },
        pings: function() {
            return pings
        }
    }
})()

;(function continuousPing() {
    var url = 'http://ajax.googleapis.com/ajax/libs/chrome-frame/1.0.2/CFInstall.min.js'
    ping(url, function(error, ping) {
        if (error) {
            console.error(error)
        } else {
            pings.add(ping.start, ping.lag)

            var update = d3.select('#chart').selectAll('div')
                .data(pings.pings(), function(ping) { return ping.start })
            update.append('div')
                .text(function(ping) { return ping.lag })
            update.enter().append('div')
                .style('height', function(ping) { return ping.lag + 'px' })
                .append('div')
                    .text(function(ping) { return ping.lag })
            update.exit().remove()
        }

        setTimeout(continuousPing, 1)
    })
})()
