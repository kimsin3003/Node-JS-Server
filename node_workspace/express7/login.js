var express = require('express');
var app = express();
app.set('port', process.env.PORT || 3000);

var handlebars = require('express-handlebars').create({defaultLayout:'main'});
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

var bodyparser = require('body-parser').urlencoded({ extended: true});
app.use(bodyparser);

var session = require('express-session');

app.use(session({
  secret: 'my_secret',
  resave: false,
  saveUninitialized: true
}));

app.get('/login', function(req, res){
 res.render('login', {
   login_ok: req.session.login_ok,
   login_id: req.session.login_id
 });
});

app.get('/login_not', function(req, res){
  res.render('login_not');
});


app.get('/login_out', function(req, res){
  req.session.destroy(function (err) {

    res.redirect('/login');
  });
});

app.post('/login_do', function(req, res){

  if(req.body.id == 'admin' && req.body.pw == 'admin') {
    req.session.login_ok = true;
    req.session.login_id = req.body.id;
    res.redirect(303, '/login');
  }else{
    req.session.login_ok = false;
    res.redirect(303, '/login_not');
  }
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
