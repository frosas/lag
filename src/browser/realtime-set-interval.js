// Based on http://www.html5rocks.com/en/tutorials/workers/basics/
/* eslint-disable no-console */

module.exports = (() => {
    var URL = window.URL || window.webkitURL;
    if (URL && Worker && Blob) {
        var blobUrl = URL.createObjectURL(new Blob(
            ['self.onmessage = function(event) { setInterval(function() { self.postMessage({}) }, event.data.interval) }'],
            {type: 'text/javascript'}
        ));
        return (callback, interval) => {
            var worker = new Worker(blobUrl);
            worker.addEventListener('message', callback);
            worker.postMessage({interval: interval});
        };
    }

    console.warn('Worker or Blob not available, falling back to setInterval()');
    return setInterval;
})();
