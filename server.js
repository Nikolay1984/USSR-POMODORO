//
// var http = require("http");
// var url = require("url");
// var server = new http.Server();
// server.listen(1337 , "127.0.0.1");
//
//
//
// server.on("request" , function (req , res) {
// 	var urlObj = url.parse(req.url);
//
// 	console.log(urlObj.query);
//
// 	res.end(req.url);
//
// });
// console.log(1);
let debug = require("debug");
let debugA = debug("a");
let debugB = debug("b");
let debugC = debug("c");

debugA("123");
debugB("456");
debugC("789");