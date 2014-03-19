var http = require("http");
var objContainer = [];
var responseObj;

exports.sendResponse = sendResponse = function(response, status, responseObj) {
  var headers = {
    "Content-Type" : "application/json",
    "access-control-allow-origin": "*",
    "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
    "access-control-allow-headers": "content-type, accept",
    "access-control-max-age": 10 // Seconds.
  };
  response.writeHead(status, headers);
  response.end(JSON.stringify(responseObj));
};

exports.handleChatRequest = function(request, response) {

  console.log("Serving request type " + request.method + " for url " + request.url);


  if (request.method === 'OPTIONS') {
    responseObj = {results : objContainer};
    sendResponse(response, 200, {});
  }

  if (request.method === 'GET') {
    responseObj = {results : objContainer};
    sendResponse(response, 200, responseObj);
  }

  if (request.method === 'POST') {
    var result = '';
    request.on('data', function(chunk){
      result += chunk;
    });
    request.on('end', function(){
      console.log(JSON.parse(result));
      objContainer.unshift(JSON.parse(result));
      console.log('objContainer length :', objContainer.length);
    });
    sendResponse(response, 201, {});
  }

};

