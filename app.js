var sys = require('sys'),
    http = require('http'),
    url = require('url'),
    path = require('path'),
    fs = require('fs'),
    mime = require('./mime').types,
    config = require('./config'),
    zlib = require('zlib'),
    utils = require('./utils');

var port = process.env.PORT || 8082;

http.createServer(function (request, response) {
    var uri = url.parse(request.url).pathname;
    var filename = path.join(__dirname + '', uri);

    //response.writeHead(200, { "Content-Type": "text/plain" });
    //response.write(filename);
    //response.end();

    var compressHandle = function (raw, compressMatched, statusCode, reasonPhrase) {
        var stream = raw;
        var acceptEncoding = request.headers['accept-encoding'] || "";
        var matched = compressMatched; // ext.match(config.Compress.match);

        if (matched && acceptEncoding.match(/\bgzip\b/)) {

            response.setHeader("Content-Encoding", "gzip");
            stream = raw.pipe(zlib.createGzip());

        } else if (matched && acceptEncoding.match(/\bdeflate\b/)) {

            response.setHeader("Content-Encoding", "deflate");
            stream = raw.pipe(zlib.createDeflate());
        }

        response.writeHead(statusCode, reasonPhrase);
        stream.pipe(response);
    };

    path.exists(filename, function (exists) {
        if (!exists) {
            response.writeHead(404, { "Content-Type": "text/plain" });
            response.write("404 Not Found\n");
            response.end();
            return;
        }

        var ext = path.extname(filename);
        ext = ext ? ext.slice(1) : 'unknow';
        var contentType = mime[ext] || 'text/plain';
        response.setHeader('Content-Type', contentType);

        response.setHeader('Access-Control-Allow-Origin', "*");
        response.setHeader('Access-Control-Allow-Credentials', true);
        response.setHeader('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS');

        fs.stat(filename, function (err, stat) {
            var lastModified = stat.mtime.toUTCString();
            var ifModifiedSince = "If-Modified-Since".toLowerCase();

            response.setHeader("Last-Modified", lastModified);
            response.setHeader("Server", "Node/V2");

            // add cache control
            if (ext.match(config.Expires.fileMatch)) {
                var expires = new Date();
                expires.setTime(expires.getTime() + config.Expires.maxAge * 1000);
                response.setHeader("Expires", expires.toUTCString());
                response.setHeader("Cache-Control", "max-age=" + config.Expires.maxAge);
            }

            if (request.headers[ifModifiedSince] && lastModified == request.headers[ifModifiedSince]) {
                response.writeHead(304, 'Not Modified');
                response.end();
                return;
            }
            /*
            fs.readFile(filename, "binary", function (err, file) {
            if (err) {
            response.writeHead(500, 'Internal server error', { 'Content-Type': 'text/plain' });
            response.write(err + "\n");
            response.end();
            return;
            }
            response.writeHead(200, 'OK');
            response.write(file, 'binary');
            response.end();
            });*/

            var compressMatched = ext.match(config.Compress.match);

            if (request.headers["range"]) {
                var range = utils.parseRange(request.headers["range"], stat.size);
                if (range) {
                    response.setHeader("Content-Range", "bytes " + range.start + "-" + range.end + "/" + stat.size);
                    response.setHeader("Content-Length", (range.end - range.start + 1));
                    var raw = fs.createReadStream(filename, { "start": range.start, "end": range.end });
                    compressHandle(raw, compressMatched, 206, "Partial Content");
                }
                else {
                    response.removeHeader("Content-Length");
                    response.writeHead(416, "Request Range Not Satisfiable");
                    response.end();
                }
            }
            else {
                var raw = fs.createReadStream(filename);
                compressHandle(raw, compressMatched, 200, "OK");
            }
        });
    });
}).listen(port);

sys.puts('server running at http://localhost:'+ port +'/');

