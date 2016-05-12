var express = require('express');
var app = express();

app.set('port', process.env.PORT || 3000);

var names = [
  {id:0, name: '홍길동'},
  {id:1, name: '김기사'},
];


app.get('/names/:id', function(req, res){
  res.type('text/plain');
  res.send(names[req.params.id].name);ew
});

app.listen(app.get('port'), function(){
  console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate');
});
