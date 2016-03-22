var http = require('http');
var fs = require('fs');

http.createServer(function(req, res){
  if(req.url == '/'){
    showHome(req, res);
  }
}).listen(3000, "127.0.0.1");



function showHome(req, res) {
  fs.readFile('./callback_text.json', function(err, data){
    if(err){
      return errorProc(error, res);
    }

    makeHtml(data, res);
  });
}

function makeHtml(data, res){
  var titles = JSON.parse(data.toString());
  fs.readFile('./callback_template.html', function(err, data){
    if(err){
      return errorProc(error, res);
    }

    var tmpl = data.toString();
    var html = tmpl.replace('%', titles.join('</li><li>'));
    res.writeHead(200, {'Content-Type':'text/html'});
    res.end(html);
  });
}

function errorProc(err, res){
  console.error(err);
  res.end('Server Error');
}
