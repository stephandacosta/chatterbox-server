var fs = require('fs');
var url = require('url');

exports.serveFile = function(request, response){
  var fileToCall = '';
  if (request.url.substr(0,7) === "/static") {
    fileToCall = "../client" + request.url;
  } else {
    fileToCall = "../client/indexTest.html";
  }

  fs.readFile(fileToCall, function (err, html) {
    if (err) {
        throw err;
    }
    response.writeHeader(200, {"Content-Type": "text/html"});
    response.write(html);
    response.end();
  });

};