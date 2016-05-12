var express = require('express');
var bodyParser = require('body-parser');
var mysql      = require('mysql');
var bodyparser = require('body-parser').urlencoded({ extended: true});
var mongoose = require('mongoose');
var app = express();

app.use(bodyparser);
app.set('view engine', 'ejs');
app.set('port', process.env.PORT || 3000);

var db = mongoose.connection;
db.on('error', console.error);
db.once('open', function(){
  console.log("connected to mongodb server");
});

mongoose.connect('mongodb://localhost:27017/test');

var Schema = mongoose.Schema;

var memberSchema = new Schema({
  name: String,
  published_date: { type: Date, default: Date.now }}, { collection: 'member'});

var Member = mongoose.model('member', memberSchema);

app.get('/add', function(req, res){
  res.render('add');
});

app.get('/', function(req, res){
  Member.find(function(err, members){
    if(err) return res.status(500).send({error: 'database failure'});
      res.json(members);
  });
});

app.post('/', function(req, res){
  var member = new Member();
  member.name = req.body.name;
  member.save(function(err){
    if(err) {
      console.error(err);
      res.status(500).send({error: 'data save failure'})
    }
    res.send('add success');
  });

});


app.listen(app.get('port'), function(){
  console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate');
});
