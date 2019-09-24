
var app = require('express')();
var http = require('http').createServer(app);
var port=process.env.PORT ||3000

app.get('/', function(req, res){
res.sendFile(__dirname + '/index.ejs');
});

http.listen(port, function(){
console.log('listening on *:' + port);

});
