var http = require('http');
var dt = require('./dateMod');
var url = require('url');
var fs = require('fs');

http.createServer(function (req, res) {
  fs.appendFile('mynewfile1.txt', 'Hello content!', function (err) {
  if (err) throw err;
  console.log('Saved!');
});
  fs.unlink('mynewfile1.txt', function (err) {
  if (err) throw err;
  console.log('File deleted!');
});
  fs.readFile('index.html', function(err, data) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(data);
    //return res.end();
    //res.writeHead(200, {'Content-Type': 'text/html'});
    var q = url.parse(req.url, true).query;
    var txt = q.year + " " + q.month;
    res.write("The date and time are currently: " + dt.myDateTime());
    //res.write(req.url);
    res.end(txt);
  });
}).listen(8081);
