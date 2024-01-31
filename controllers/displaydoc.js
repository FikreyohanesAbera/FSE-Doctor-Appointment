

const express = require("express");
const jwt =  require("jsonwebtoken");
const db = require('../routes/db-config');
const bcrypt = require("bcryptjs");
const path = require("path");
const bodyParser = require("body-parser");


const router = express.Router();
router.use(bodyParser.urlencoded({
    extended: true
  }));

const displaydoc = async (req,res,next) => {
    db.query('SELECT * from doctors', (err, resultss) => {
        if (err) throw err;
        req.doctors = resultss;
        return next();
    })
    
}


module.exports = displaydoc;