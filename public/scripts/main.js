var debug = true

// Error handling
addEventListener('error', function(event) { alert(event.message) })
requirejs.onError = function(error) { throw error.message + ' (see console for details)' }

require.config({
    paths: {
        jquery: 'http://ajax.googleapis.com/ajax/libs/jquery/1.8/jquery' + (debug ? '' : '.min'),
        underscore: '//cdnjs.cloudflare.com/ajax/libs/underscore.js/1.4.4/underscore' + (debug ? '' : '-min'),
        backbone: '//cdnjs.cloudflare.com/ajax/libs/backbone.js/0.9.10/backbone-min',
        d3: 'http://d3js.org/d3.v3' + (debug ? '' : '-min')
    },
    shim: {
        'backbone': ['underscore']
    }
})

require(['chart', 'page-title', 'page-icon', 'pings', 'title', 'user', 'audio', 'controls'], function(Chart, PageTitle, PageIcon, Pings, Title, User, Audio, Controls) {
    var user = new User
    var pings = new Pings
    new Chart(user, pings)
    new PageTitle(user, pings)
    new PageIcon(user, pings)
    new Title(user, pings)
    var audio = Audio.create(user, pings)
    new Controls(audio)
})
