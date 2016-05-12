var express = require('express');
var app = express();

app.set('port', process.env.PORT || 3000);

app.set('view engine', 'ejs');

app.get('/', function(req, res){
  res.type('text/html');
  res.render('index', { name: req.query.name });
});

app.get('/about', function(req, res){
  res.type('text/html');
  res.render('about');
});


app.get('/mobile', function(req, res){
  res.type('text/html');
  res.render('mobile');
});

app.use(function(req,res){//반드시 get 밑에 있어야한다.
  console.log(req.url);
  res.type('text/plain');
  res.status('404');
  res.send('404 - Not Fount');
});

app.use(function(err, req, res,next){
  console.log(req.url);
  console.error(err.stack);
  res.type('text/plain');
  res.status('500');
  res.send('500 - Server Error');
});

app.listen(app.get('port'), function(){
  console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate');
});
