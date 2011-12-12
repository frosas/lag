require(['ping-url', 'page-title'], function(pingUrl, pageTitle) {

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

        // Resource has to be
        // - Small
        // - In a CDN (close to the user)
        // - A Javascript (TODO really?)
        var url = 'http://ajax.googleapis.com/ajax/libs/chrome-frame/1.0.2/CFInstall.min.js'

        pingUrl(url, function(error, ping) {
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

                pageTitle.update(ping)
            }

            setTimeout(continuousPing, 1)
        })
    })()
})
