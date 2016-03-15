var fs = require('fs');
var data  = "async write";

fs.writeFile(__dirname + '/file.txt', data, function(error, data){
  if(error){
    console.log(error);
  }
});
