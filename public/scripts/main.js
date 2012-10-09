require.config({
    paths: {
        underscore: 'http://documentcloud.github.com/underscore/underscore-min',
        backbone: 'http://backbonejs.org/backbone-min'
    },
    shim: {
        'backbone': ['underscore']
    }
})

require(['chart', 'page-title', 'page-icon', 'common', 'pings', 'title', 'backbone'], function(Chart, PageTitle, PageIcon, common, Pings, Title) {
    var pings = new Pings
    var chart = new Chart(pings)
    var pageTitle = new PageTitle
    var pageIcon = new PageIcon
    var title = new Title

    setInterval(function() { pings.add() }, common.pingInterval)

    setInterval(function() {
        var lag = pings.currentLag()
        pageTitle.update(lag)
        pageIcon.update(lag)
        title.update(lag)
    }, 250 /* Give enough time to read it */)
})
