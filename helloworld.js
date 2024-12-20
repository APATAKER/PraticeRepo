var http = require('http');
var dt = require('./dateMod');
var url = require('url');
var fs = require('fs');
var adr = 'http://localhost:8080/default.htm?year=2017&month=february';
var qa = url.parse(adr, true);
var qdata = qa.query;

http.createServer(function (req, res) {
  //fs.appendFile('mynewfile1.txt', 'Hello content!', function (err) {
  //if (err) throw err;
  //console.log('Saved!');
//});
  fs.unlink('mynewfile1.txt', function (err) {
  if (err) throw err;
  console.log('File deleted!');
});
  var q = url.parse(req.url, true).query;
  var filename = "." + q.pathname;
  fs.readFile(filename, function(err, data) {
    if (err) {
      res.writeHead(404, {'Content-Type': 'text/html'});
      return res.end("404 Not Found");
    } 
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(data);
    //return res.end();
    //res.writeHead(200, {'Content-Type': 'text/html'});
    var txt = q.year + " " + q.month;
    res.write("The date and time are currently: " + dt.myDateTime());
    res.write(req.url);
    res.end(txt);
  });
  console.log(qa.host);
  console.log(qa.pathname);
  console.log(qa.search);
  console.log(qdata.month);
}).listen(8081);
