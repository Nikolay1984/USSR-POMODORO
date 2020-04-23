var http = require("http");
var server = new http.Server();
// var responseHtml = "<!DOCTYPE html>\n" +
//     "<html lang=\"en\">\n" +
//     "<head>\n" +
//     "    <meta charset=\"UTF-8\">\n" +
//     "    <title>Document</title>\n" +
//     "\n" +
//     "</head>\n" +
//     "<body>\n" +
//     "\n" +
//     "\n" +
//     "<div style='width: 100px; height: 100px; background: red'>\n" +
//     "\n" +
//     "</div>\n" +
//     "\n" +
//     "\n" +
//     "\n" +
//     "</body>\n" +
//     "</html>";
server.listen(8055,"127.0.0.1");

server.on('request',function (req,res) {
    // res.setHeader ("X-Frame-Options", "DENY");
    res.end("responseHtml");
});