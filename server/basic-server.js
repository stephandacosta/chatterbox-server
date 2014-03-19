var http = require("http");
var fs = require('fs');
var requestHandler = require("./request-handler.js");
var localFileHandler = require ("./local-file-handler.js");

var port = 3000;
var ip = "127.0.0.1";


var routingSwitch = {
  "/1/classes/chatterbox" : requestHandler.handleChatRequest,
  "/classes/messages" : requestHandler.sendResponse,
  "/" : localFileHandler.serveFile
};


var routing = function(request, response) {
  console.log("handling type " + request.url);
  if (routingSwitch[request.url]){
    routingSwitch[request.url](request,response);
  } else {
      if (request.url.substr(0,7) === "/static") {
        localFileHandler.serveFile(request, response);
      } else {
        sendResponse(response, 404, {});
      }
  }
};


var server = http.createServer(routing);
console.log("Listening on http://" + ip + ":" + port);
server.listen(port, ip);