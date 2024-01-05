const express = require('express');
const db = require("./routes/db-config");
const cookieParser = require('cookie-parser');
const port = process.env.PORT || 3000;
const path = require('path')
const app = express();
const stripe  = require("stripe")(process.env.STRIPE_PRIVATE_KEY)

app.use("/js",express.static(__dirname + "/public/js"));
app.use("/css",express.static(__dirname + "/public/css"));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");


app.use(cookieParser());
app.use(express.json());

db.connect(err => {
    if (err) throw err;
    else{
        console.log("db created successfully");
        db.query("CREATE TABLE IF NOT EXISTS users(patientid INT AUTO_INCREMENT PRIMARY KEY,firstName text,lastName text, email varchar(100), password varchar(100))", (err, result) => {
            if (err) throw err;
        })
        db.query("CREATE TABLE IF NOT EXISTS doctors(id INT AUTO_INCREMENT PRIMARY KEY, firstName text,lastName text, specialization text, fromTime varchar(100), toTime varchar(100), phone varchar(100), rating FLOAT NOT NULL DEFAULT 0.0)", (err, result) => {
            if (err) throw err;
        })
        db.query("CREATE TABLE IF NOT EXISTS appointments(appointmentid INT AUTO_INCREMENT PRIMARY KEY, doctorid INT, patientid INT, time VARCHAR(100), date VARCHAR(100), paid TINYINT NOT NULL DEFAULT 0)", (err, result) => {
            if (err) throw err;
        })
        db.query("CREATE TABLE IF NOT EXISTS Ratings(doctorid INT, total_votes INT, number_of_votes INT)", (err, result) => {
            if (err) throw err;
        })


    }
})


app.use("/",require("./routes/pages"));
app.use("/api",require("./controllers/auth.js"));
app.use("/",require("./controllers/apply"));
app.use("/book",require(("./controllers/book")).router);
app.use("/search",require("./controllers/search"));
app.use("/payment", require("./controllers/payment"))

// app.use("/",require("./controllers/payment"))

app.listen(port, function() {
    console.log("app running on port 3000");
})