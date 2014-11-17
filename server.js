var express = require('express');
var app = express();
var fs = require('fs');

var meshbluConfigFile = __dirname + '/meshblu.json';

app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

app.post('/credentials', function(req, res) {
  var meshbluConfig = req.body;
  fs.writeFile(meshbluConfigFile, JSON.stringify(meshbluConfig), function(err) {
    if (err) {
      res.send(500);
    } else {
      res.send(201);
    }
  });
});

app.get('/credentials', function(req, res) {
  var meshbluConfig = require(meshbluConfigFile);
  res.send(meshbluConfig);
});

app.listen(3300);