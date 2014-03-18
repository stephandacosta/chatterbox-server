/* You should implement your request handler function in this file.
 * And hey! This is already getting passed to http.createServer()
 * in basic-server.js. But it won't work as is.
 * You'll have to figure out a way to export this function from
 * this file and include it in basic-server.js so that it actually works.
 * *Hint* Check out the node module documentation at http://nodejs.org/api/modules.html. */

exports.handleRequest = function(request, response) {
  /* the 'request' argument comes from nodes http module. It includes info about the
  request - such as what URL the browser is requesting. */

  console.log("Serving request type " + request.method + "with request header " + request.headers['access-control-request-method'] + " for url " + request.url);

  var statusCode = 200;

  /* Without this line, this server wouldn't work. See the note
   * below about CORS. */
  var headers = defaultCorsHeaders;

  headers['Content-Type'] = "text/plain";


  /* .writeHead() tells our server what HTTP status code to send back */
  response.writeHead(statusCode, headers);
  /* Documentation for both request and response can be found at
   * http://nodemanual.org/0.8.14/nodejs_ref_guide/http.html */
  
  var urlMessage = require("url");
  var http = require("http");
  var qs = require('querystring');

  var objContainer = [];

  var method = request.headers['access-control-request-method']; //gives us the GET and POST
  // console.log('request header :' , method);
  if (request.method === 'OPTIONS') {
    // console.log('options method');
  } 

  if (request.method === 'GET') {
    // console.log('get method');
    // We need to add in options for sending back objects based on requested URL
    // console.log("THIS IS WHAT WE WANT:" + request.url + " END ");
    //
    var testObject = {results : [{
      createdAt : "2013-10-07T16:22:03.280Z",
      objectId : "teDOY3Rnpe",
      roomname : "lobby",
      text : "hello",
      updatedAt : "2013-10-07T16:22:03.280Z",
      username : "gary"
    }]};

    response.end(JSON.stringify(testObject));


  } 


  if (request.method === 'POST') {

    var result = '';
    request.on('data', function(chunk){
      // console.log(chunk);
      result += chunk;
    });

    request.on('end', function(chunk){
    // console.log('parsed result: ' + qs.parse(result).text);
    objContainer.push(qs.parse(result));
    });


  } 

  


  /* Make sure to always call response.end() - Node will not send
   * anything back to the client until you do. The string you pass to
   * response.end() will be the body of the response - i.e. what shows
   * up in the browser.*/
   
  response.end(JSON.stringify(testObject));
};

/* These headers will allow Cross-Origin Resource Sharing (CORS).
 * This CRUCIAL code allows this server to talk to websites that
 * are on different domains. (Your chat client is running from a url
 * like file://your/chat/client/index.html, which is considered a
 * different domain.) */
var defaultCorsHeaders = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10 // Seconds.
};
    // console.log("*******************this is the request ****************"); 
    // console.log(request);
    // console.log("*******************this was the request ****************"); 
