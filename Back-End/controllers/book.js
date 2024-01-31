
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
    let compareTime = req.body.time;
    let compTime = new Date(inputTime).getTime();

    let validApp = true;

    db.query('SELECT time,date from appointments WHERE doctorid = ?', [req.body.doctorid], async (err, results) => {
        results.forEach(result => {
            let dbTime = new Date(result.time).getTime();
            let dbDate = result.date;
            let diff = (compTime - dbTime) / 60_000;
            if (dbDate === req.body.date && Math.abs(diff) < 30) {
                validApp = false;
            }
        })
        if (!validApp) {
            console.log(11111111111);
            res.json({
                status: "error",
                customCode: 12,
                message: "Appointment Available"
            });

        }
        else {
            // will change it later
            console.log("emh")
            console.log(req.body.doctorid)


            db.query('SELECT fromTime,toTime from doctors WHERE id = ?', [req.body.doctorid], async (errr, responses) => {
                // let finishTime = new Date(responses[0].toTime).getTime();
                // finishTime /= 60_000;
                // finishTime -= 30;

                // let starting = new Date(responses[0].fromTime).getTime();
                // starting /= 60_000;
                // compareTime /= 60_000;
                // console.log(compareTime,starting,finishTime)
                const compareTimeDate = new Date(`2024-01-01 ${compareTime}`);
                const storedStartTimeDate = new Date(`2024-01-01 ${responses[0].fromTime}`);
                const storedFinishTimeDate = new Date(`2024-01-01 ${responses[0].toTime}`);
                if ( storedStartTimeDate < compareTimeDate && compareTimeDate <= new Date(storedFinishTimeDate.getTime() - 30 * 60000)) {
                    console.log("very true")
                    // will change to ...
                    db.query('INSERT INTO appointments SET ?', { doctorid: Number(req.body.doctorid), patientid: [req.user.id], time: inputTime, date: req.body.date }, (err, results) => {
                        if (err) throw err;
                        else {
                            res.json({
                                status: "success",
                                customCodee: 10,
                                message: "successfully booked"
                            });
                        }
                    })
                }
                else {
                    res.json({
                        status: "error",
                        customCode: 12,
                        message: "Appointment Available"
                    });

                }


            });

        }


    })




});

module.exports = router;