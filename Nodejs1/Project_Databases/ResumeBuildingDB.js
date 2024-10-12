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
    database: "resume_building",
});
con.connect((err) => {
    if (!err) console.log("db connected");
    else console.log("not connected" + err);
});
app.get("/", function (req, res) {
    console.log("Got a get request for the homepage");

    con.query("select * from technical_info", 
        function (err, result, fields) {
        if (err) throw err;
        res.send(result);
    });
    console.log("connected!");
});

app.get("/display", function (req, res) {
    console.log("Got a get request for the homepage");
    let k = req.query.t1;
    console.log(k);

    // con.query("select * from info where Reg_no.='" + k + "'", 
    con.query("SELECT * FROM technical_info WHERE `full_name` = ?", [k],
        function (err, result, fields) {
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
    let t4 = req.query.t4;
    let t5 = req.query.t5;
    let t6 = req.query.t6;
    let t7 = req.query.t7;
    let t8 = req.query.t8;
    let t9 = req.query.t9;

    // con.query("insert into info (Reg_no.,password) values('" + t1 + "','" + t2 + "')",
    con.query("INSERT INTO `technical_info` (`upload photo`, `full_name`, `email_id`, `current_position`, `bio`, `educational_background`, `training&certifications`, `projects`, `technical_skills`) VALUES (?,?,?,?,?,?,?,?,?)", [t1, t2,t3,t4,t5,t6,t7,t8,t9],
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
    let t3 = req.query.t3;
    let t4 = req.query.t4;
    let t5 = req.query.t5;
    let t6 = req.query.t6;
    let t7 = req.query.t7;
    let t8 = req.query.t8;
    let t9 = req.query.t9;

    // con.query("update customers set age='" + t1 + "' where name='" + t2 + "'",
    con.query( "UPDATE `technical_info` SET `upload photo` = ?, `current_position` = ?, `bio` = ?, `educational_background` = ?, `training&certifications` = ?, `projects` = ?, `technical_skills` = ? WHERE `full_name` = ?", [t1, t2,t3,t4,t5,t6,t7,t8,t9],
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

    // con.query("delete from customers where name='" + t1 + "'", 
    con.query("DELETE FROM technical_info WHERE `full_name` = ?", [t1],
        function (err, result, fields) {
        if (err) throw err;
        res.send("data deleted");
        console.log(result)
    });
    console.log("connected!");
});

var server = app.listen(8085, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log("example app listening at http://%s:%s", host, port);
});