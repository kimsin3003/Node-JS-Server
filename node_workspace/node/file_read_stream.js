//동기 방식으로 스트림으로 파일을 읽는 방법.
//chunk단위로 읽어온다. --> 파일에 대한 락을 오래 걸지 않아서 좋다.


var fs = require('fs');
var stream = fs.createReadStream(__dirname + '/file.txt');

stream.on('data', function(data) {
  var chunk = data.toString();
  process.stdout.write(chunk);
});

stream.on('end', function() {
  console.log();
});

stream.on('error', function(error) {
  console.error(error.message);
});
