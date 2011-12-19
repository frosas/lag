require(['ping-url', 'chart', 'page-title', 'page-icon'], function(pingUrl, chart, pageTitle, pageIcon) {

    var pingElement = $('#ping')

    // Resource has to be
    // - Small
    // - In a CDN (close to the user)
    // - A Javascript (TODO really?)
    var url = 'http://ajax.googleapis.com/ajax/libs/chrome-frame/1.0.2/CFInstall.min.js'

    setInterval(function() {
        var ping = chart.addPing()
        pingUrl(url, function(error) {
            if (error) {
                console.error(error)
            } else {
                ping.pong()
                pageTitle.update(ping)
                pageIcon.update(ping)
                pingElement.text(ping.lag() + " ms")
            }
        })
    }, 500)
})
