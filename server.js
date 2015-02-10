var express    = require('express');
var bodyParser = require('body-parser');
var app        = express();
var fs         = require('fs');

var meshbluConfigFile = __dirname + '/meshblu.json';

app.use(express.static(__dirname + '/public'));

app.use(bodyParser.json());

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/public/index.html');
});

app.post('/credentials', function(req, res) {
  var meshbluConfig = req.body;
  fs.writeFile(meshbluConfigFile, JSON.stringify(meshbluConfig), function(err) {
    if (err) {
      res.status(500).end();
    } else {
      res.status(201).end();
    }
  });
});

app.get('/credentials', function(req, res) {
  try{
    res.json(require(meshbluConfigFile));
  }catch(error){
    console.error(error);
  }
});

app.listen(3300);