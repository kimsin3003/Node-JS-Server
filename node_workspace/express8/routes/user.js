var express = require('express');
var router = express.Router();


router.use('/:id', function(req, res){
  var id = req.params.id;
  if(id == 0)
    res.send("no user id 0");
  else {
    res.send('use id' + id);
  }
});

module.exports = router; //이게 있어야 밖에서 use로 이 파일을 호출 할 수 있다.
