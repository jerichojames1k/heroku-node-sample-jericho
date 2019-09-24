
// var app = require('express')();
// var http = require('http').createServer(app);
// var port=process.env.PORT ||3000

// app.get('/', function(req, res){
// res.sendFile(__dirname + '/index.html');
// });

// http.listen(port, function(){
// console.log('listening on *:' + port);

// });
const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

app.get('/', function(req, res) {
    res.render('index.ejs');
});

io.sockets.on('connection', function(socket) {
    socket.on('username', function(username) {
    socket.username = username;
        io.emit('is_online', socket.username + ' join the chat..');
    });

    socket.on('disconnect', function(username) {
        io.emit('is_online', socket.username + ' left the chat..');
    })

    socket.on('chat_message', function(message) {
        io.emit('chat_message', message );
    });
    
    socket.on('typing', function(username) {
        io.emit('typing', username);
    });

});

const server = http.listen(8080, function() {
    console.log('listening on *:8080');
});