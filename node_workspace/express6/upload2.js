var express = require('express');
var app = express();
app.set('port', process.env.PORT || 3000);

var handlebars = require('express-handlebars').create({defaultLayout:'main'});
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

var formidable = require('formidable');

app.get('/upload', function(req, res){
  res.render('upload');
});

app.post('/upload_do', function(req, res){
  var form = new formidable.IncomingForm();
  form.keepExtensions = true;

  form.parse(req, function(err, fields, files){
    console.log('fields: ');
    console.log(fields);
    console.log('files: ');
    console.log(files);

  });

  form.on('fileBegin', function(name, file) {
    form.uploadDir = __dirname + '/uploads';

  });

  form.on('progress',  function(bytesReceived, bytesExpected) {
    console.log("받은 바이트수:" +bytesReceived);
  });

  form.on('end', function(){
    res.redirect('/upload_ok');
  });
});


app.get('/upload_ok', function(req, res){

  res.render('upload_ok');
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
