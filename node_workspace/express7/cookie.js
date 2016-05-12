var express = require('express');
var app = express();
app.set('port', process.env.PORT || 3000);

var cookieParser = require('cookie-parser');

app.use(cookieParser());

app.get('/counter', function(req, res){

  if(req.cookies.counter == undefined)
  {
    req.cookies.counter = 0;
  }

  var counter = parseInt(req.cookies.counter)+1;

  res.cookie('counter', counter, {
    maxAge: 60*1000,
  });

  res.send("counter: " + counter);
});


app.get('/counter_clear', function(req, res){
  res.clearCookie('counter');
  res.redirect('/counter');
})

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
