require.config({
    paths: {
        underscore: 'http://documentcloud.github.com/underscore/underscore-min',
        backbone: 'http://backbonejs.org/backbone-min'
    },
    shim: {
        'backbone': ['underscore']
    }
})

require(['chart', 'page-title', 'page-icon', 'pings', 'title', 'user', 'backbone'], function(Chart, PageTitle, PageIcon, Pings, Title, User) {
    var user = new User
    var pings = new Pings
    new Chart(user, pings)
    new PageTitle(user, pings)
    new PageIcon(user, pings)
    new Title(user, pings)
})
