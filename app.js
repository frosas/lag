var express = require('express'),
    socketIo = require('socket.io')

var app = express.createServer()

app.configure(function() {
    app.use(express.static(__dirname + '/public'))
})

app.listen(process.env.PORT || 8080)

var io = socketIo.listen(app)

io.enable('browser client minification')
io.enable('browser client etag')
io.enable('browser client gzip')
io.set('log level', 1)

io.sockets.on('connection', function(socket) {
    socket.on('ping', function(data) {
        socket.emit('pong', data)
    })
})
