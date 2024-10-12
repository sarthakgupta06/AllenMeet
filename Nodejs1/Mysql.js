var mysql = require("mysql2")
var con = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"root",
    database:"school"
});
con.connect(function(err){
    if(err) throw err;
    console.log("connected!");
    // var sql = ("create table employee1(name varchar(30),address varchar(100))");
    // var sql = ("insert into employee1 values('harsh','sikandara')")
    // var sql = ("insert into employee1 values('aman','kargil')")
    // var sql = ("desc school")
    // var sql = ("show databases")
    // var sql = ("show tables")
    // var sql = ("select * from employee")
    // var sql = ("select * from employee1")
    // var sql = ("SELECT * FROM Student WHERE name LIKE 'A%'")
    // var sql = ("SELECT * FROM Student WHERE physics = (SELECT MAX(physics) FROM Student)OR chemistry = (SELECT MAX(chemistry) FROM Student)OR maths = (SELECT MAX(maths) FROM Student);")
    var sql = ("SELECT *, (physics + chemistry + maths) AS total_marks FROM Student;")

    con.query(sql,function(err,result){
        if(err) throw err;
        console.log(result);
    })
})