
var app = require('express')();
var http = require('http').createServer(app);
var ports=process.env.PORT ||3000


http.listen(ports, function(){
console.log('listening on *:' + ports);

});

