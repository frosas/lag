require(['chart', 'page-title', 'page-icon', 'common'], function(chart, pageTitle, pageIcon, common) {
    var $pingEl = $('#ping')
    setInterval(function() {
        var ping = chart.addPing()
        $.ajax({
            // Resource shall be small, close to the user (eg, in a CDN) and in the web (not in localhost or the
            // intranet)
            url: 'http://lag.frosas.net/scripts/blank.js',
            timeout: common.maxPing,
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
                $pingEl.text(ping.lag() + " ms")
            }
        })
    }, common.pingInterval)
})
