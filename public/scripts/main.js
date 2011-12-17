require(['ping-url', 'chart', 'page-title', 'page-icon'], function(pingUrl, chart, pageTitle, pageIcon) {

    var pingElement = $('#ping')

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
                chart.add(ping)
                pageTitle.update(ping)
                pageIcon.update(ping)
                pingElement.text(ping.lag + " ms")
            }

            setTimeout(continuousPing, 1)
        })
    })()
})
