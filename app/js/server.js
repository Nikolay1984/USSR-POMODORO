"use strict";

var http = require("http");
var server = new http.Server();
server.listen(1337,"127.0.0.1");

var emit = server.emit;

server.emit = function(event){
	console.log(event);
	emit.apply(this, arguments)
};



server.on("request",function (req,res) {
	var result = Math.random();
	res.end(result + '');

})
