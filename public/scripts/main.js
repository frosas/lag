require.config({
    paths: {
        underscore: 'http://documentcloud.github.com/underscore/underscore-min',
        backbone: 'http://backbonejs.org/backbone-min',
        jquery: 'http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min',
        d3: 'http://d3js.org/d3.v2.min',
        audiolet: 'https://raw.github.com/oampo/Audiolet/master/src/audiolet/Audiolet.min'
    },
    shim: {
        'backbone': ['underscore']
    }
})

requirejs.onError = function(error) {
    if (error.requireType == 'timeout') {
        alert("Timeout reached loading the dependencies. Please, try reloading the page.")
    } else {
        alert("Unknown error found loading the dependencies. See console for details.")
    }

    throw error
}

require(['chart', 'page-title', 'page-icon', 'pings', 'title', 'user', 'audio', 'controls'], function(Chart, PageTitle, PageIcon, Pings, Title, User, Audio, Controls) {
    var user = new User
    var pings = new Pings
    new Chart(user, pings)
    new PageTitle(user, pings)
    new PageIcon(user, pings)
    new Title(user, pings)
    var audio = new Audio(user, pings)
    new Controls(audio)
})
