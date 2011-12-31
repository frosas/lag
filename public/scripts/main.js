require(['chart', 'page-title', 'page-icon', 'config'], function(chart, pageTitle, pageIcon, config) {

    var pingElement = $('#ping')

    var setRealInterval = function(callback, interval) {
        // "In (Firefox 5.0 / Thunderbird 5.0) and Chrome 11, timeouts are 
        // clamped to firing no more often than once per second (1000ms) in 
        // inactive tabs" http://stackoverflow.com/questions/6585112/javascript-performance-when-running-in-an-unfocused-tab
        var minBrowserInterval = 1000
        var setIntervalsCount = Math.max(1, minBrowserInterval / interval)
        for (var i = 0; i < setIntervalsCount; i++) {
            ;(function(i) {
                setTimeout(function() {
                    setInterval(callback, interval * setIntervalsCount)
                }, i * interval)
            })(i)
        }
    }

    setRealInterval(function() {
        var ping = chart.addPing()
        $.ajax({
            // Resource has to be: small, close to the user (eg, in a CDN), a 
            // Javascript (TODO really?)
            url: 'http://ajax.googleapis.com/ajax/libs/chrome-frame/1.0.2/CFInstall.min.js',
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
