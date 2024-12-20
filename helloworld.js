var http = require('http');
var dt = require('./dateMod');
var url = require('url');
var fs = require('fs');
var uc = require('upper-case');
var events = require('events');
var formidable = require('formidable');
var eventEmitter = new events.EventEmitter();
var adr = 'http://localhost:8080/default.htm?year=2017&month=february';
var qa = url.parse(adr, true);
var qdata = qa.query;

var myEventHandler = function () {
  console.log('I hear a scream!');
}

eventEmitter.on('scream', myEventHandler);
eventEmitter.emit('scream');
http.createServer(function (req, res) {
  //fs.appendFile('mynewfile1.txt', 'Hello content!', function (err) {
  //if (err) throw err;
  //console.log('Saved!');
//});
  //fs.unlink('mynewfile1.txt', function (err) {
  //if (err) throw err;
  //console.log('File deleted!');
//});
  var q = url.parse(req.url, true);
  var filename = "." + q.pathname;
  res.writeHead(200, {'Content-Type': 'text/html'});
  fs.readFile(filename, function(err, data) {
    if (err) {
      res.writeHead(404, {'Content-Type': 'text/html'});
      console.log(err)
      return res.end("404 Not Found");
    } 
    res.write(data);
    //return res.end();
    //res.writeHead(200, {'Content-Type': 'text/html'});
    //var q = url.parse(req.url, true).query;
    var txt = q.year + " " + q.month;
    res.write("The date and time are currently: " + dt.myDateTime());
    res.write(req.url);
    res.write(uc.upperCase("Hello World!"));
    eventEmitter.emit('scream');
    res.end();
  });
  res.write('<form action="fileupload" method="post" enctype="multipart/form-data">');
  res.write('<input type="file" name="filetoupload"><br>');
  res.write('<input type="submit">');
  res.write('</form>');
  console.log(qa.host);
  console.log(qa.pathname);
  console.log(qa.search);
  console.log(qdata.month);
}).listen(8081);
