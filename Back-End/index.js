const express = require("express");
const db = require("./routes/db-config");
const cookieParser = require("cookie-parser");
const bcrypt = require("bcryptjs");
const port = process.env.PORT || 3001;
const path = require("path");
const app = express();
const stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY);
const cors = require("cors");

const corsOptions ={
  origin: ['http://localhost:3000','http://localhost:5173'], 
  credentials:true,            
  optionSuccessStatus:200,
}
app.use(cors(corsOptions));

app.use(cookieParser());
app.use(express.json());

const admins = [
  {
    firstName: "Abebe",
    lastName: "Tilahun",
    phone: "0987654321",
    email: "abebe@gmail.com",
    password: "12345",
  },
];

const insertAdmins = async (admin) => {
  db.query(
    "SELECT * FROM admins WHERE email = ?",
    [admin.email],
    async (err, result) => {
      if (result.length >= 1) {
        return;
      }
      db.query(
        "INSERT INTO admins SET ?",
        {
          firstName: admin.firstName,
          lastName: admin.lastName,
          phone: admin.phone,
          email: admin.email,
          password: await bcrypt.hash(admin.password, 8),
        },
        (err, result) => {
          if (err) throw err;

          console.log(`Inserted/updated ${result.affectedRows} rows`);
          db.end();
        }
      );
    }
  );
};

db.connect((err) => {
  if (err) throw err;
  console.log("Connected to MySQL server.");

  const createDatabaseQuery = `CREATE DATABASE IF NOT EXISTS Efoyta`;

  db.query(createDatabaseQuery, (err, results) => {
    if (err) throw err;
    const useDatabaseQuery = `USE Efoyta`;
    db.query(useDatabaseQuery, (err) => {
      if (err) throw err;
      console.log("Efoyta database.");

      db.query(
        "CREATE TABLE IF NOT EXISTS users(id INT AUTO_INCREMENT PRIMARY KEY,firstName text,lastName text, email varchar(100), phone varchar(100), password varchar(100))",
        (err, result) => {
          if (err) throw err;
        }
      );
      db.query(
        "CREATE TABLE IF NOT EXISTS admins(id INT AUTO_INCREMENT PRIMARY KEY,firstName text,lastName text, phone varchar(100), email varchar(100), password varchar(100))",
        (err, result) => {
          if (err) throw err;
        }
      );

      for (let admin of admins) {
        insertAdmins(admin);
      }

      db.query(
        `CREATE TABLE IF NOT EXISTS applications(id INT AUTO_INCREMENT PRIMARY KEY,
            userId INT NOT NULL,
            privilege VARCHAR(100) NOT NULL,
            startTime VARCHAR(100) DEFAULT '8:30 AM',
            endTime  VARCHAR(100) DEFAULT '05:00 PM',
            department VARCHAR(100) NOT NULL,
            status ENUM('pending', 'declined', 'accepted') NOT NULL DEFAULT 'pending',
            FOREIGN KEY (userId) REFERENCES users(id))`,
        (err, result) => {
          if (err) throw err;
        }
      );
      db.query(
        "CREATE TABLE IF NOT EXISTS labtechnicians(id INT AUTO_INCREMENT PRIMARY KEY,firstName text,lastName text, phone varchar(100), department text, email varchar(100), password varchar(100))",
        (err, result) => {
          if (err) throw err;
        }
      );
      db.query(
        "CREATE TABLE IF NOT EXISTS doctors(id INT AUTO_INCREMENT PRIMARY KEY, firstName text,lastName text, specialization text, fromTime varchar(100), email varchar(100), toTime varchar(100), phone varchar(100), password varchar(100), rating FLOAT NOT NULL DEFAULT 0.0)",
        (err, result) => {
          if (err) throw err;
        }
      );
      db.query(
        "CREATE TABLE IF NOT EXISTS appointments(appointmentid INT AUTO_INCREMENT PRIMARY KEY, doctorid INT, patientid INT, time VARCHAR(100), date VARCHAR(100), paid TINYINT NOT NULL DEFAULT 0)",
        (err, result) => {
          if (err) throw err;
        }
      );
      db.query(
        "CREATE TABLE IF NOT EXISTS Ratings(doctorid INT, total_votes INT, number_of_votes INT)",
        (err, result) => {
          if (err) throw err;
        }
      );
    });
  });
});

const userController = require("./controllers/user.controller");
const doctorsController = require("./controllers/doctor.controller");
const appointmentsController = require("./controllers/appointment.controller");
const authController = require("./controllers/auth.controller");
const applicationController = require("./controllers/apply.controller");

app.use("/auth", authController);
app.use("/users", userController);
app.use("/doctors", doctorsController);
app.use("/appointments", appointmentsController);
app.use("/apply", applicationController);

app.use("/",require("./routes/pages"));
app.use("/",require("./controllers/book"));
app.use("/",require("./controllers/lab"));
app.use("/",require("./controllers/history"));


app.listen(port, function () {
  console.log("app running on port 3001");
});
