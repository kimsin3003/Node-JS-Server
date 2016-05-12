var express = require('express');
var app = express();

app.set('port', process.env.PORT || 3000);

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

var users = [
  {name: "gildong", phone: '010-2421-2121'},
  {name: "minsu", phone: '010-4432-1578'},
  {name: "chulsu", phone: '010-1478-9843'}
];

app.get('/', function(req, res){
  res.type('text/html');
  res.render('user', { users:users, title: "EJS code" });
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
