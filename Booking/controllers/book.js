
const express = require("express");
const db = require('../routes/db-config');
const bodyParser = require("body-parser");
const moment = require("moment");
const loggedIn = require("./loggedin");


const router = express.Router();

router.use(bodyParser.urlencoded({
    extended: true
}));

let doctor = {}
router.post("/doctor", (req, res) => {
    doctor = {
        id: req.body.doctorid
    }
    res.send({url:"/book"})
})
router.get("/load",(req, res) =>{
    db.query('SELECT * FROM appointments WHERE appointmentid=(SELECT max(appointmentid) FROM appointments)', async (err, results) => {
       console.log(results)
        if (results.length == 0){
           res.json({app: 1, doctorid: doctor.id
        })
       } else{
            res.json({app: results[0].appointmentid + 1, doctorid: doctor.id})
            console.log(results[0])
       }
    })
})
router.post("/submit", loggedIn, (req, res) => {
    let inputTime = moment(req.body.time, "HH:mm").toISOString();
    console.log("inputTime" + inputTime);
    let compareTime = new Date(inputTime).getTime();
    console.log("compareTime" + compareTime);
    let validApp = true;
    db.query('SELECT time,date from appointments WHERE doctorid = ?', [req.body.doctorid], async (err, results) => {
        console.log("showing query results" , results, req.body.doctorid)
        if (!results){
            results.forEach(result => {
                let dbTime = new Date(result.time).getTime();
                let dbDate = result.date;
                console.log()
                let diff = (compareTime - dbTime) / 60_000;
                if (dbDate === req.body.date && Math.abs(diff) < 30) {
                    validApp = false;

                }
            })
        }
        if (!validApp) {
            console.log("date reason")
            res.redirect("/book?error=AppointmentUnavailable");

        }
        else {

            db.query('SELECT fromTime,toTime from doctors WHERE id = ?', [req.body.doctorid], async (errr, responses) => {
                let finishTime = new Date(responses[0].toTime).getTime();
                finishTime /= 60_000;
                finishTime -= 30;
                let starting = new Date(responses[0].fromTime).getTime();
                starting /= 60_000;
                compareTime /= 60_000;
                console.log(starting, compareTime, finishTime)
                console.log(starting < compareTime, compareTime <= finishTime)
                if ((starting > compareTime) && (compareTime <= finishTime)) {
                
                    db.query('INSERT INTO appointments SET ?', { doctorid: Number(req.body.doctorid), patientid: 1, time: inputTime, date: req.body.date }, (err, results) => {
                        if (err) throw err;
                        else {
                            res.send("success")
                        }

                    })

                }
                else {
                    res.redirect("/book?error=AppointmentUnavailable");
                    console.log("time reason")

                }


            });

        }


    })

});

const booked =async (req, res, next) => {
    db.query("SELECT * FROM appointments WHERE appointmentid = ?",[req.body.appointment.appointmentid], (err, results) => {
        if(results.length > 0){
            next()
        } else{
            res.send({url: "/cancel"})
        }
    })

}

module.exports = {  
    router: router,
    booked: booked
};