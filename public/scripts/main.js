require(['chart', 'page-title', 'page-icon', 'config'], function(chart, pageTitle, pageIcon, config) {

    var pingElement = $('#ping')

    setInterval(function() {
        var ping = chart.addPing()
        $.ajax({
            // Resource shall be small, close to the user (eg, in a CDN)
            url: 'http://lag.frosas.net/scripts/blank.js',
            timeout: config.maxPing,
            dataType: 'script',
            success: function() {
                ping.pong()
            },
            error: function(xhr, status, error) {
                console.error(error)
            },
            complete: function() {
                pageTitle.update(ping)
                pageIcon.update(ping)
                pingElement.text(ping.lag() + " ms")
            }
        })
    }, config.pingInterval)
})
