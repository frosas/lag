define(function() {

    /**
     * @param url It has to be a Javascript file
     */
    return function(url, callback) {
        var start = new Date
        $.ajax({
            url: url,
            timeout: 5000,
            dataType: 'script',
            complete: function(xhr, status) {
                var lag = new Date - start
                var error = status in ['error', 'timeout'] ? status : null
                callback(error, {start: start, lag: lag})
            }
        })
    }
})
