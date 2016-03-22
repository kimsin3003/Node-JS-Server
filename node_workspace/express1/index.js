var express = require('express');
var app = express();

app.set('port', process.env.PORT || 3000);

app.get('/', function(req, res){ //route 메서드들은 위에서부터 순서대로 검사하다가 먼저걸리는 것에 들어간다.
  res.type('text/plain')
  res.send('Express Index');
});

app.get('/about', function(req, res){
  res.type('text/plain');
  res.send('Express About');
});

app.use(function(req,res){//반드시 get 밑에 있어야한다.
  res.type('text/plain');
  res.status('404');
  res.send('404 - Not Fount');
});

app.use(function(err, req, res,next){
  console.error(err.stack);
  res.type('text/plain');
  res.status('500');
  res.send('500 - Server Error');
});

app.listen(app.get('port'), function(){
  console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate');
});
