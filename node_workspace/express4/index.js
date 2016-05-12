var express = require('express');
var app = express();

app.set('port', process.env.PORT || 3000);

app.get('/about', function(req, res){
  res.type('text/html');
  res.status('200');
  res.sendFile(__dirname + '/about.html');
});


app.get('/', function(req, res){
  res.type('text/html');
  res.redirect('/about');
});

app.get('/headers', function(req, res){
  res.type('text/plain');
  var s = '';

  for(var name in req.headers){
    s += name + ':' + req.headers[name] + '\n';
  }
  res.send(s);
});


app.listen(app.get('port'), function(){
  console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate');
});
