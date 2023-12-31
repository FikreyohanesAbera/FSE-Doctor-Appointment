
const express = require("express");
const db = require('../routes/db-config');
const bodyParser = require("body-parser");
const moment = require("moment");
const loggedIn = require("./loggedin");


const router = express.Router();

router.use(bodyParser.urlencoded({
    extended: true
}));


router.post("/book", loggedIn, (req, res) => {
    let inputTime = moment(req.body.time, "HH:mm").toISOString();
    console.log("inputTime" + inputTime);
    let compareTime = new Date(inputTime).getTime();
    console.log("compareTime" + compareTime);
    let validApp = true;
    db.query('SELECT time,date from appointments WHERE doctorid = ?', [req.body.doctorid], async (err, results) => {
        results.forEach(result => {
            let dbTime = new Date(result.time).getTime();
            let dbDate = result.date;
            console.log()
            let diff = (compareTime - dbTime) / 60_000;
            if (dbDate === req.body.date && Math.abs(diff) < 30) {
                validApp = false;
            }
        })
        if (!validApp) {
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

                if ((starting < compareTime) && (compareTime <= finishTime)) {
                    db.query('INSERT INTO appointments SET ?', { doctorid: Number(req.body.doctorid), patientid: req.user.id, time: inputTime, date: req.body.date }, (err, results) => {
                        if (err) throw err;
                        else {
                            res.redirect("/payment");
                        }

                    })

                }
                else {
                    res.redirect("/book?error=AppointmentUnavailable");

                }


            });

        }


    })




});

module.exports = router;