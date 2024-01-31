


const express = require("express");
const db = require('../routes/db-config');
const bodyParser = require("body-parser");
const loggedIn = require("./loggedin");


const router = express.Router();
router.use(bodyParser.urlencoded({
    extended: true
}));


router.post("/patientmedhistory",loggedIn,(req,res) => {
    // will change later
    db.query("SELECT id FROM doctors WHERE userId = ?",req.user.id,(err,results) => {
        if (results.length === 0){
            return res.json({
                status: "error",
                message: "doctor did not log in"
            });
        }
        db.query("SELECT id FROM users WHERE email = ?",[req.body.email],(err,results2) => {
            if (results2.length === 0){
                return res.json({
                    status: "error",
                    message: "patient does not exist"
                })
            }

            db.query('INSERT INTO patienthistory SET ?',{
                doctorId: results[0].id,
                patientId: results2[0].id,
                reason: req.body.reason,
                diagnosisResult: req.body.diagnosisResult,
                date: req.body.date
    
            })
                return res.json({
                    status: "success",
                    message: "Successfully recorded"
                })
            }

        )
          
    })

})




module.exports = router;


