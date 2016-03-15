var http = require('http');
var fs = require('fs');

funciton write(req, res, text){
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end(text);
}
