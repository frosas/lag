define(function() {
    return function() {
        var $title = $('#title')
        return {
            update: function(lag) {
                $title.text(lag + " ms")
            }
        }
    }
})
