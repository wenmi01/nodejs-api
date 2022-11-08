var http = require('http');

http.createServer(function(request, response){

    //Send the HTTP Header
    // HTTP Status 200: OK
    // Content type: text/plain
    response.writeHead(200, {'Context-Type': 'text/plain'});

    // Send response
    response.end("Hello World");

}).listen(9000);