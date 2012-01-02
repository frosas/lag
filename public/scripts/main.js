require(['chart', 'page-title', 'page-icon', 'config'], function(chart, pageTitle, pageIcon, config) {

    var pingElement = $('#ping')

    setInterval(function() {
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
