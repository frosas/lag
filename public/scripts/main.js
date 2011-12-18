require(['chart', 'page-title', 'page-icon'], function(chart, pageTitle, pageIcon) {

    var pingElement = $('#ping')

    var socket = io.connect()

    socket.on('connect', function() {
        setInterval(function() {
            socket.emit('ping', {start: new Date().getTime()})
        }, 500)
    })

    socket.on('pong', function(ping) {

        ping.lag = new Date().getTime() - ping.start

        chart.add(ping)
        pingElement.text(ping.lag + " ms")
        pageTitle.update(ping)
        pageIcon.update(ping)
    })
})
