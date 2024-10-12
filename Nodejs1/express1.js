var express = require("express");
var mysql = require("mysql");
var bodyparser = require("body-parser");

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

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "kalu",
});

con.connect((err) => {
    if (!err) console.log("db connected");
    else console.log("not connected" + err);
});

app.get("/", function (req, res) {
    console.log("Got a get request for the homepage");

    con.query("select * from customers", function (err, result, fields) {
        if (err) throw err;
        res.send(result);
    });
    console.log("connected!");
});

app.get("/display", function (req, res) {
    console.log("Got a get request for the homepage");
    let k = req.query.t1;
    console.log(k);

    con.query("select * from customers where name='" + k + "'", function (err, result, fields) {
        if (err) throw err;
        // res.send(result);
        res.send("data display")
        console.log(result)
    });
    console.log("connected!");
});

app.get("/insert", function (req, res) {
    console.log("Got a get request for the homepage");
    let t1 = req.query.t1;
    let t2 = req.query.t2;
    let t3 = req.query.t3;

    con.query("insert into customers (name,age,salery) values('" + t1 + "','" + t2 + "','" + t3 + "')",
        function (err, result, fields) {
        if (err) throw err;
        res.send("data inserted");
        console.log(result)
    });
    console.log("connected!");
    
});

app.get("/update", function (req, res) {
    console.log("Got a get request for the homepage");
    let t1 = req.query.t1;
    let t2 = req.query.t2;

    con.query("update customers set age='" + t1 + "' where name='" + t2 + "'",
        function (err, result, fields) {
        if (err) throw err;
        res.send("data updated");
        console.log(result)
    });
    console.log("connected!");
});

app.get("/delete", function (req, res) {
    console.log("Got a get request for the homepage");
    let t1 = req.query.t1;

    con.query("delete from customers where name='" + t1 + "'", function (err, result, fields) {
        if (err) throw err;
        res.send("data deleted");
        console.log(result)
    });
    console.log("connected!");
});

var server = app.listen(8081, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log("example app listening at http://%s:%s", host, port);
});
