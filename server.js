var http = require("http");
var url = require("url");
console.log(url);
var server = new http.Server();
server.listen(1337 , "127.0.0.1");



server.on("request" , function (req , res) {
	var urlObj = url.parse(req.url);
	debugger;
	console.log(urlObj.query);

	res.end(req.url);

});
console.log(1);