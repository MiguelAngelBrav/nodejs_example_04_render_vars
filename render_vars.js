var http = require("http");
var fs = require("fs");

http.createServer(function(req, res){
  fs.readFile("./index.html", function(err, html) {
    var html_string = html.toString();

    // regular expresion for search var
    var vars = html_string.match(/[^\{\}]+(?=\})/g);
    var name = "Luchino";

    for (var i = vars.length - 1; i >= 0; i--) {
      var value = eval(vars[i]);
      html_string = html_string.replace("{" + vars[i] + "}", value)
    };

    res.writeHeader(200,{"Content-Type":"text/html"})
    res.write(html_string);
    res.end();
  });
}).listen(8090);