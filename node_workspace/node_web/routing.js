var http = require('http');
var fs = require('fs');

function write(req, res, text) {
  res.writeHead(200, {'Content-Type' : 'text/plain' });
  res.end(text);
}

function routing(req, res) {
  var path = req.url.replace(/\/?(?:\?.*)?$/, '').toLowerCase();

  switch(path){
    case '':
      write(req, res, 'Homepage');
      break;

    case '/home':
      readFile(res, '/public/twitter.html', 'text/html');
      break;

    case '/home':
      readFile(res, '/public/twitter.html', 'text/html');
      break;

    case '/home':
      readFile(res, '/public/twitter.html', 'text/html');
      break;

    case '/img/logo.jpg':
      readFile(res, '/public/img/logo.jpg', 'image/jpg');
      break;

    default:
      write(req, res, 'default');
      break;
  }
}

function readFile(res, path, contentType, responseCode) {
  if(!responseCode) responseCode = 200;
  fs.readFile(__dirname + path, function(err, data) {
    if(err) {
      res.writeHead(500, {'Content-Type': 'text/plain'});
      res.end('500 - Internal Error');
    }else {
      res.writeHead(responseCode, { 'Content-Type': contentType});
      res.end(data);
    }
  });
}


http.createServer(routing).listen(3000);

console.log('Server started on localhost:3000; press Ctrl+C to terminate...');
