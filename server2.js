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
//     "<iframe src=\"http://127.0.0.1:8008/\" frameborder=\"0\" height = \"300\" width=\"300\">  </iframe>\n" +
//     "\n" +
//     "\n" +
//     "<div style='width: 100px; height: 100px; background: green'>\n" +
//     "\n" +
//     "</div>\n" +
//     "\n" +
//     "\n" +
//     "\n" +
//     "</body>\n" +
//     "</html>";
server.listen(8010,"127.0.0.2");

server.on('request',function (req,res) {

    res.end("responseHtml");
});