var http = require("http");
http
.createServer(function(req,res){
    res.writeHead(200,{"content-type":"text/html"})
    res.write("<h1>my name is harsh</h1>")
    res.end("hello world")
})
.listen(8084)