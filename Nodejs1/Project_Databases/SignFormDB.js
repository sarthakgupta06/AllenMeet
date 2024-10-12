var express = require("express");
var mysql = require("mysql");
var bodyParser = require("body-parser");
var cors = require("cors");
var app = express();

// Middleware setup
app.use(cors());
app.use(bodyParser.json());

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
});

// Database connection setup
var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "applicationdata",
});

con.connect((err) => {
    if (err) {
        console.error("Database connection failed: " + err.stack);
        return;
    }
    console.log("Connected to database.");
});

//check data(login)

app.get("/check", function (req, res) {
    console.log("check");
    let t1 = req.query.reg_no;
    let t2 = req.query.password;
    console.log(t1)
    console.log(t2)

    const query = "SELECT * FROM information WHERE `reg_no` = ? and password = ?";
    con.query(query, [t1, t2],
        function (err, result, fields) {
            if (err) {
                console.error(err);
                res.send({ 'status': false, 'error': 'Database query error' });
                return;
            }
            if (result.length > 0) {
                // console.log(fields);
                console.log(result[0].Email_Id);
                res.send({ 'email': result[0].Email_Id, 'status': true });
            } else {
                res.send({ 'status': false });
            }

        });
    console.log("connected!");
});

// Insert data route
app.get("/insert", function (req, res) {
    console.log("Got a get request for the homepage");

    const t1 = req.query.Name;
    const t2 = req.query.Phone_no;
    const t3 = req.query.Email_Id;
    const t4 = req.query.reg_no;
    const t5 = req.query.password;

    const sql = "INSERT INTO information (Name, Phone_no, Email_Id, reg_no, password) VALUES (?,?,?,?,?)";
    const query1 = "INSERT INTO profile (Photourl,fullName,email,position,bio,eduback,traincerti,projects,tecskills) VALUES (?,?,?,?,?,?,?,?,?)";
    const fsdata = "INSERT INTO users (email,friends) VALUES (?,?)";

    con.query(sql, [t1, t2, t3, t4, t5], function (err, result) {
        if (err) {
            console.error("Error inserting data into information: ", err);
            res.status(500).send("Error inserting data into information");
            return;
        }

        con.query(query1, [null, null, t3, null, null, null, null, null, null], function (err, result) {
            if (err) {
                console.error("Error inserting data into profile: ", err);
                res.status(500).send("Error inserting data into profile");
                return;
            }

            con.query(fsdata, [t3, null], function (err, result) {
                if (err) {
                    console.error("Error inserting data into users: ", err);
                    res.status(500).send("Error inserting data into users");
                    return;
                }

                res.send("Data inserted successfully into all tables");
                console.log("Result: ", result);
            });
        });
    });
});

app.get('/companies', (req, res) => {
    const sql = "SELECT compname FROM companyprofile";
    con.query(sql, (err, results) => {
        if (err) {
            console.error("Error fetching data from companyprofile: ", err);
            res.status(500).send("Error fetching data from companyprofile");
            return;
        }
        res.json(results);
    });
});


app.get("/company_profile", function (req, res) {
    console.log("Got a get request for the homepage");

    const { complogo, compname, compdesc, reqhistory, skilldemand } = req.query;

    // Validate input
    if (!complogo || !compname || !compdesc || !reqhistory || !skilldemand) {
        res.status(400).send("All fields are required and cannot be null");
        return;
    }

    const sql = "INSERT INTO companyprofile (complogo, compname, compdesc, reqhistory, skilldemand) VALUES (?, ?, ?, ?, ?)";
    con.query(sql, [complogo, compname, compdesc, reqhistory, skilldemand], function (err, result) {
        if (err) {
            console.error("Error inserting data into companyprofile: ", err);
            res.status(500).send("Error inserting data into companyprofile");
            return;
        }
        res.send("Data inserted successfully into companyprofile");
        console.log("Result: ", result);
    });
});


//update profile
app.post("/updateProfile", function (req, res) {
    const { Photourl, fullName, email, currentPosition, bio, educationalBackground, trainingCertifications, projects, technicalSkills } = req.body;
    console.log(req.body);
    const sql2 = `UPDATE profile SET 
                Photourl=?,
                fullName = ?, 
                position = ?, 
                bio = ?, 
                eduback = ?, 
                traincerti = ?, 
                projects = ?, 
                tecskills = ? 
                WHERE email = ?`;

    con.query(sql2, [Photourl, fullName, currentPosition, bio, educationalBackground, trainingCertifications, projects, technicalSkills, email], (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send('Failed to update profile');
            return;
        }
        res.send('Profile updated successfully');
        console.log("Result: ", result);

    });
});

//search
app.get('/search', (req, res) => {
    const fullName = req.query.name;
    const sql = "SELECT * FROM profile WHERE fullName LIKE ?";

    const searchTerm = `%${fullName}%`;

    con.query(sql, [searchTerm], (err, results) => {
        if (err) {
            console.error("Error fetching data: ", err);
            res.status(500).send("Error fetching data");
            return;
        }
        res.send(results);
        console.log(results);
    });
});


// connect
// app.post('/connect', (req, res) => {
//     const userEmail = req.body.email;
//     const status = req.body.status;
//     const { userEmail, friendEmail } = req.body;

//     const query = `UPDATE users 
//     SET friends = '{}' 
//     WHERE email = 'anjali@gmail.com'`;

//     UPDATE users 
// SET friends = JSON_SET(friends, '$.friend_id', 'harsh@gmail.com', '$.status', false) 
// WHERE email = 'anjali@gmail.com';

//     con.query(query, [status, userEmail], (err, result) => {
//         if (err) {
//             console.error(err);
//             res.status(500).send('Failed to update friends list');
//             return;
//         }
//         res.send('Friends list updated successfully');
//         console.log("Result: ", result);
//         // console.log(user)
//     });
// });

// app.post('/connect', (req, res) => {
//     const userEmail = req.body.email;
//     const status = req.body.status;
//     const fsdata = "INSERT INTO users (email, friends) VALUES (?, ?)";
//     const fsdata = `UPDATE users SET friends=?, WHERE email ="11@gmail.com"`;
//     con.query(fsdata, [userEmail, status], (err, result) => {
//       if (err) {
//         console.error(err);
//         res.status(500).send("Error inserting data");
//         res.status(500).send('Failed to update');
//         return;
//       }
//       res.send("Connected successfully");
//       res.send('updated successfully');
//       console.log("Result: ", result);
//     });
//   });


app.get('/posts', (req, res) => {
    con.query('SELECT * FROM posts ORDER BY id DESC', (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(results);
    });
});


app.post('/addPost', (req, res) => {
    const { name, description } = req.body;

    const sql = 'INSERT INTO posts (name, description) VALUES (?, ?)';
    con.query(sql, [name, description], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        const newPost = { id: result.insertId, name, description };
        res.json({ message: 'Post added successfully', post: newPost });
    });
});

//getuser
app.get('/getProfile', (req, res) => {
    const t1 = req.query.email;
    console.log(t1)
    const user = "SELECT photourl, fullName, email, position AS currentPosition, bio, eduback AS educationalBackground, traincerti AS trainingCertifications, projects, tecskills AS technicalSkills FROM profile WHERE email = ?";
    con.query(user, [t1], (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send('Failed to fetch profile data');
            return;
        }
        res.send(result)
        console.log("Result: ", result);
        // console.log(result)
    });
});


// Server setup
var server = app.listen(8083, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log("Example app listening at http://%s:%s", host, port);
});
