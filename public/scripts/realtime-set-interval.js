// Based on http://www.html5rocks.com/en/tutorials/workers/basics/
define(function() {
    var URL = window.URL || window.webkitURL
    // BlobBuilder is deprecated but Chrome for Android fails with an "Illegal constructor" 
    // instantiating the Blob directly
    var BlobBuilder = window.BlobBuilder || window.WebKitBlobBuilder
    if (URL && Worker && Blob && BlobBuilder) {
        var blobBuilder = new BlobBuilder
        blobBuilder.append('self.onmessage = function(event) { setInterval(function() { self.postMessage({}) }, event.data.interval) }')
        var blob = blobBuilder.getBlob('text/javascript')
        var blobUrl = URL.createObjectURL(blob)
        return function(callback, interval) {
            var worker = new Worker(blobUrl)
            worker.addEventListener('message', callback)
            worker.postMessage({interval: interval})
        }
    }

    console.log("Worker or Blob not available, falling back to setInterval()")
    return setInterval
})
