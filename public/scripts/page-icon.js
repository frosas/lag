define(['common'], function(common) {

    var pingQualityIconUrl = function(ping) {
        if (ping.lag() < 200) return 'images/bullet_green.png'   // Good
        if (ping.lag() < 300) return 'images/bullet_yellow.png'  // Almost good
        if (ping.lag() < 1000) return 'images/bullet_orange.png' // So so
        if (ping.lag() < 5000) return 'images/bullet_red.png'    // Bad
        return 'images/bullet_black.png'
    }

    var element = $('link[rel~=icon]')
    if (! element.length) element = $('<link rel="icon">').appendTo('head')
    element.attr('type', 'image/png')

    return {
        update: function(ping) {
            element.attr('href', pingQualityIconUrl(ping))
        }
    }
})
