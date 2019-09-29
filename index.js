var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var express = require('express');
var port = process.env.PORT || 3000;
var oldmessages = [];
var users = [];

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});
 app.use(express.static('public'));

io.on('connection', function(socket){
  socket.on('chat message', function(msg){
    oldmessages.push(msg);
    io.emit('chat message', msg);
  });

  socket.on('user login', function(msg){
   if (!users.includes(msg.name)){
      users.push(msg.name);
     io.emit('user login', users);
   } else {
      io.emit("already used", msg);
   }
  });


  socket.on('typing', function(msg) {
  	io.emit('typing', msg);
  });

  socket.on('logout', function(msg) {
   var i = users.indexOf(msg.name);
   users.splice(i, 1);
  	io.emit('user login', users);
  });

  socket.on('oldmessages', function(data) {
    io.emit('oldmessages', {sender: data, messages: oldmessages} );
  });

 

});

http.listen(port, function(){
  console.log('listening on *:' + port);
});