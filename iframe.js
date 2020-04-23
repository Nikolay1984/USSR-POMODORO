var http = require("http");
var iframe = new http.Server();
var responseHtml = "<!DOCTYPE html>\n" +
    "<html lang=\"en\">\n" +
    "<head>\n" +
    "    <meta charset=\"UTF-8\">\n" +
    "    <title>Document</title>\n" +
    "\n" +
    "</head>\n" +
    "<body>\n" +
    "\n" +
    "\n" +
    "<div style='width: 100px; height: 100px; background: red'>\n" +
    "\n" +
    "</div>\n" +
    "\n" +
    "\n" +
    "\n" +
    "</body>\n" +
    "</html>";
iframe.listen(8070,"127");

iframe.on('request',function (req,res) {
    res.setHeader ("X-Frame-Options", "ALLOW-FROM 127.0.0.2");
    res.end(responseHtml);
});