require.config({
    paths: {
        underscore: 'http://documentcloud.github.com/underscore/underscore-min',
        backbone: 'http://backbonejs.org/backbone-min'
    },
    shim: {
        'backbone': ['underscore']
    }
})

require(['chart', 'page-title', 'page-icon', 'common', 'pings', 'backbone'], function(Chart, PageTitle, PageIcon, common, Pings) {
    var pings = new Pings
    var chart = new Chart(pings)
    var pageTitle = new PageTitle
    var pageIcon = new PageIcon

    var $pingEl = $('#ping')
    setInterval(function() {
        var ping = pings.add()
        $.ajax({
            // Resource shall be small, close to the user (eg, in a CDN) and in the web (not in localhost or the
            // intranet)
            url: 'http://lag.frosas.net/scripts/blank.js',
            timeout: 60000  ,
            dataType: 'script',
            success: function() {
                ping.pong()
            },
            error: function(xhr, status, error) {
                console.error(error)
            }
        })
    }, common.pingInterval)

    setInterval(function() {
        var lag = pings.currentLag()
        pageTitle.update(lag)
        $pingEl.text(lag + " ms")
        pageIcon.update(lag)
    }, 250 /* Give enough time to read it */)
})
