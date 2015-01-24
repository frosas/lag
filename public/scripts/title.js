/* eslint-env amd */

define(['jquery'], function($) {
    return function(user, pings) {
        var $title = $('#title');
        user.on('read', function() {
            $title.text(pings.currentLag() + " ms");
        });
    };
});
