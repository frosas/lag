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

    setInterval(function() { pings.add() }, common.pingInterval)

    setInterval(function() {
        var lag = pings.currentLag()
        pageTitle.update(lag)
        $pingEl.text(lag + " ms")
        pageIcon.update(lag)
    }, 250 /* Give enough time to read it */)
})
