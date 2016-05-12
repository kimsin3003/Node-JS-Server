var express = require('express');
var bodyParser = require('body-parser');
var mysql      = require('mysql');

var app = express();
app.set('view engine', 'ejs');

var pool = mysql.createPool({
connectionLimit : 10,
host : 'localhost',
user : 'root',
password : 'xodn**26',
database : 'nodetest'
});


app.set('port', process.env.PORT || 3000);

app.get('/', function(req, res){

  pool.query('SELECT * from overwatch', function(err, rows, fields) {
    if (err) throw err;
    res.render('index', { heroes: rows });
  });

})

app.listen(app.get('port'), function(){
  console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate');
});
