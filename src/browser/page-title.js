/* eslint-env amd */

define(['./lag'], function(lag) {
    return function(user, pings) {
        var original = document.title;
        user.on('read', function() { 
            document.title = original + " (" + lag.humanize(pings.currentLag()) + ")";
        });
    };
});
