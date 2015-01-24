/* eslint-env amd */

define(['jquery', 'lag'], function($, lag) {
    return function(user, pings) {
        var $title = $('#title');
        user.on('read', function() {
            $title.text(lag.humanize(pings.currentLag()));
        });
    };
});
