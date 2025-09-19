const sql = require("mysql2");
const dotenv = require("dotenv").config();

console.log("creating sql connection")
const db = sql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    // database: process.env.DATABASE
   
})

  
module.exports = db;