


const express = require("express");
const db = require('../routes/db-config');
const bodyParser = require("body-parser");
const loggedIn = require("./loggedin");
const jwt = require("jsonwebtoken");

const router = express.Router();
router.use(bodyParser.urlencoded({
    extended: true
}));


router.post("/patienthistory",loggedIn, async (req,res) => {
    // will change later
    console.log("post history")
    if(req.cookies.token){
        const decoded = await jwt.verify(req.cookies.token,
          process.env.JWT_SECRET
        );
        console.log("doctor id ", decoded.id )
    db.query("SELECT id FROM doctors WHERE id = ?",[decoded.id],(err,results) => {
        if (!results || results.length === 0){
            return res.json({
                status: "error",
                message: "doctor did not log in"
            });
        }
        console.log(req.body.email)
        db.query("SELECT id FROM users WHERE email = ?",[req.body.email],(err,results2) => {
            if (!results2 || results2.length === 0){
                return res.json({
                    status: "error",
                    message: "patient does not exist"
                })
            }
            console.log("yessssssssss")

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
}

})




module.exports = router;


