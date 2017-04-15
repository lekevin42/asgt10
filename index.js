var http = require('http');
var fs = require('fs');
var extract = require('./extract');
var wss = require('./websockets-server');
var mime = require('mime');

var handleError = function(err, res) {
    res.writeHead(404);
    res.end();
};

var server = http.createServer(function(req, res) {
    console.log('Responding to a request.');
    var filePath = extract(req.url);
    console.log(mime.lookup('app/stylesheets.css'));
    fs.readFile(filePath, function(err, data) {
        if (err) {
            handleError(err, res);
            return;
        } else {
            var extension_finder = filePath.indexOf('.');
            var extension = filePath.slice(extension_finder + 1);
            res.setHeader('Content-Type', 'text/' + extension);
            res.end(data);
        }
    });
});

server.listen(3000);
