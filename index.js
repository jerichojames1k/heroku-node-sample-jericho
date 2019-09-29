

var app = require('express')();
var http = require('http').Server(app);
var ports = process.env.PORT || 3000

app.get('/', function(req, res){
   res.sendFile(__dirname + '/index.html');    
});


http.listen(ports, function(){                    
 console.log('listening on *: ' + ports);
});
