/* eslint-env amd */
/* global console, alert */

var debug = true;

// Error handling

onerror = function(message, file, line, column, error) { 
    if (error) console.error('Uncaught error', error);
    alert(error && error.message || error || message);
};

require.onError = function(error) { 
    // Call onerror() directly as throwing the error makes the browser show a 
    // "Script error" error
    onerror('', '', '', '', error);
};

//

require.config({
    paths: {
        underscore: 'http://cdnjs.cloudflare.com/ajax/libs/underscore.js/1.7.0/underscore' + (debug ? '' : '-min'),
        backbone: 'http://cdnjs.cloudflare.com/ajax/libs/backbone.js/1.1.2/backbone-min',
        jquery: 'http://code.jquery.com/jquery-2.1.3' + (debug ? '' : '.min'),
        d3: 'http://d3js.org/d3.v3' + (debug ? '' : '-min')
    },
    shim: {
        'backbone': ['underscore']
    },
    waitSeconds: 5 /* mins */ * 60
});

require(
    ['chart', 'page-title', 'page-icon', 'pings', 'title', 'user', 'audio', 'controls'], 
    function(Chart, PageTitle, PageIcon, Pings, Title, User, Audio, Controls) {            
        var user = new User;
        var pings = new Pings;
        new Chart(user, pings);
        new PageTitle(user, pings);
        new PageIcon(user, pings);
        new Title(user, pings);
        var audio = Audio.create(user, pings);
        new Controls(audio);
    }
);