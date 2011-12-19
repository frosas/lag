define(function() {

    /**
     * @param url It has to be a Javascript file
     */
    return function(url, callback) {
        $.ajax({
            url: url,
            timeout: 5000,
            dataType: 'script',
            complete: function(xhr, status) {
                var error = status in ['error', 'timeout'] ? status : null
                callback(error)
            }
        })
    }
})
