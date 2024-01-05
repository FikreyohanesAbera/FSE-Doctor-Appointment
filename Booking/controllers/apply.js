
const express = require("express");
const db = require('../routes/db-config');
const bodyParser = require("body-parser");
const moment = require("moment");


const router = express.Router();

router.use(bodyParser.urlencoded({
    extended: true
  }));

router.post("/apply",(req,res) => {
    req.body.start = moment(req.body.start, "HH:mm").toISOString();
    req.body.end = moment(req.body.end, "HH:mm").toISOString();


    db.query('INSERT INTO doctors SET ?', { firstName: req.body.firstName, lastName: req.body.lastName, phone: req.body.phone,fromTime: req.body.start,toTime: req.body.end, specialization: "orthopedics" }, (err, results) =>{
        if (err) throw err;
        else{
            res.send("success");
        }

    })

})

module.exports = router;


