var debug = true

// Error handling
addEventListener('error', function(event) { alert(event.message) })
requirejs.onError = function(error) { throw error.message + ' (see console for details)' }

require.config({
    paths: {
        underscore: '//cdnjs.cloudflare.com/ajax/libs/underscore.js/1.4.4/underscore' + (debug ? '' : '-min'),
        backbone: '//cdnjs.cloudflare.com/ajax/libs/backbone.js/0.9.10/backbone-min',
        jquery: '//code.jquery.com/jquery-1.9.1' + (debug ? '' : '.min'),
        d3: 'http://d3js.org/d3.v3' + (debug ? '' : '-min')
    },
    shim: {
        'backbone': ['underscore']
    },
    waitSeconds: 60
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

    // Update the visualization as soon as we get new data
    pings.on('pong', function() { user.trigger('read') })
})
