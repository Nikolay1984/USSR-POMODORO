// var fs = require("fs");
// // console.log(process.env);
// function  bla() {
//     fs.readFile("./dist/js/Button.js",(err, data) => {
//         if (err) throw err;
//         console.log(data);
//     });
// }
// bla();

// var server = require("http").Server();
// server.listen(8008, "127.0.0.1");
//
// server.on("request",function (req,resp){
//     console.log("123");
//     resp.end("5");
// });

var debug = require("debug")("foo");
var util = require("util");
var debuglog = util.debuglog("foo");
var debuglog1 = util.debuglog("foo1");

var bar = 123;

debuglog("hello from foo [%d]" , bar);
debuglog1("hello from foo1 [%d]" , 3399393);
debug("jdfksjkdsj");