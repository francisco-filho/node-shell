var http = require('http'),
    express = require('express'),
    bodyParser = require('body-parser'),
    logger = require('morgan'),
    path = require('path');

var app = express();

app.set('port', 3000);
app.use(express.static(path.join(__dirname, 'public/')));
app.use(bodyParser.json({extended: false}));
app.use(bodyParser.urlencoded({extended: false}));
app.use(logger('combined'));

app.all('/', function(req, res){
    res.json('{"success": true}')
});

http.createServer(app).listen(3000, function(){
    console.info('Server listening on port:', app.get('port'));
});
