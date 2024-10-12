var express = require("express");
var mysql = require("mysql");
var bodyparser = require("body-parser");
const cors = require("cors");
var app = express();

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
});
app.use(bodyparser.json());

app.use(cors());

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "applicationdata",
});
con.connect((err) => {
    if (!err) console.log("db connected");
    else console.log("not connected" + err);
});

app.get("/check", function (req, res) {
    console.log("check");
    let t1 = req.query.reg_no;
    let t2 = req.query.password;
    
const query="SELECT * FROM information WHERE `reg_no` = ? and password = ?";
        con.query(query, [t1, t2],
        function (err, result, fields) {
            if (err) {
                console.error(err);
                res.send({'status': false, 'error': 'Database query error'});
                return;
            }
            if (result.length > 0) {
                res.send({'status': true});
            } else {
                res.send({'status': false});
            }

    });
    console.log("connected!");
});

var server = app.listen(8082, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log("example app listening at http://%s:%s", host, port);
});