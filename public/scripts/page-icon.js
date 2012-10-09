define(['common'], function(common) {
    return function() {
        var pingQualityIconUrl = function(lag) {
            if (lag < 200) return 'images/bullet_green.png'   // Good
            if (lag < 300) return 'images/bullet_yellow.png'  // Almost good
            if (lag < 1000) return 'images/bullet_orange.png' // So so
            if (lag < 5000) return 'images/bullet_red.png'    // Bad
            return 'images/bullet_black.png'                         // Really bad
        }

        var element = $('link[rel~=icon]')
        if (! element.length) element = $('<link rel="icon">').appendTo('head')
        element.attr('type', 'image/png')

        return {
            update: function(lag) {
                element.attr('href', pingQualityIconUrl(lag))
            }
        }
    }
})
