require(['chart', 'page-title', 'page-icon'], function(chart, pageTitle, pageIcon) {

    var pingElement = $('#ping')

    setInterval(function() {
        var ping = chart.addPing()
        $.ajax({
            // Resource has to be: small, close to the user (eg, in a CDN), a 
            // Javascript (TODO really?)
            url: 'http://ajax.googleapis.com/ajax/libs/chrome-frame/1.0.2/CFInstall.min.js',
            timeout: 5000,
            dataType: 'script',
            success: function() {
                ping.pong()
                pageTitle.update(ping)
                pageIcon.update(ping)
                pingElement.text(ping.lag() + " ms")
            },
            error: function(xhr, status, error) {
                console.error(error)
            }
        })
    }, 500)
})
