const express = require("express");
const router = express.Router();
const loggedIn = require("../controllers/loggedin");
const db = require("./db-config");
const moment = require("moment");

function getDoctorName(doctorId) {
    return new Promise((resolve, reject) => {
        db.query("SELECT firstName FROM doctors WHERE id = ?", [doctorId], (err, doctorName) => {
            if (err) {
                reject(err);
            } else {
                resolve(doctorName[0] && doctorName[0].firstName);
            }
        });
    });
}
router.post("/patient", loggedIn, (req, res) => {
    db.query('SELECT * FROM appointments WHERE patientid = ?', [req.user.id], (err, results) => {
        let filtered = [];
        if (err) throw err;
        if (results.length === 0) {
        }
        else {
            results.forEach(app => {
                const isoStringDate = app.time;
                console.log(isoStringDate);
                const momentObject = moment(isoStringDate);
                if (momentObject.isValid()) {
                    const now = moment();
                    const duration = moment.duration(momentObject.diff(now));

                    const hours = Math.floor(duration.asHours());
                    const minutes = Math.floor(duration.asMinutes()) % 60;
                    if ((hours > 0 && minutes > 0) && hours < 22) filtered.push(`${hours} hours:${minutes} minutes`);
                } else {
                    console.log('Invalid Date');
                }

            })






        }
        db.query("SELECT email FROM users WHERE id = ?", req.user.id, (error, responses) => {
            db.query('SELECT * FROM checkups WHERE patientEmail = ?', [responses[0].email], (err, results) => {
                if (err) throw err;
                let checkupArr = [];
                Promise.all(results.map(result => getDoctorName(result.doctorId)))
                    .then(doctorNames => {
                        for (let i = 0; i < results.length; i++) {
                            let isoString = results[i].date;
                            var dateObject = new Date(isoString);
                            var year = dateObject.getFullYear();
                            var month = (dateObject.getMonth() + 1).toString().padStart(2, '0'); // Month is 0-indexed, so we add 1
                            var day = dateObject.getDate().toString().padStart(2, '0');
                            var result = year + '-' + month + '-' + day;
                            results[i].date = result;
                            let checkup = { data: results[i], docName: doctorNames[i] };
                            checkupArr.push(checkup);

                        }
                        let returnTime = (filtered.length > 0) ? filtered[0] : '';
                        console.log(filtered);

                        res.json({
                            remainingTime: returnTime,
                            checkups: checkupArr

                        });

                    })
                    .catch(error => {
                        console.error("Error fetching doctor names:", error);
                    });







            })


        })





    });

})
router.post("/doctorProfile", loggedIn, (req, res) => {

    db.query('SELECT * FROM doctors WHERE userId = ?', [req.user.id], (err, results) => {
        if (err) throw err;
        const correcteddata = {
            name: results[0].name,
            specialization: results[0].specialization,
            fromTime: results[0].fromTime,
            toTime: results[0].toTime,
            fromTime: moment(results[0].fromTime).format("LT"),
            toTime: moment(results[0].toTime).format("LT")

        }
        res.json({
            data: correcteddata
        });

    });

});
router.get("/dailyvisits", loggedIn, (req, res) => {
    let arr = [];
    db.query("SELECT * FROM appointments WHERE doctorId = ?", req.user.id, (err, results) => {
        if (err) throw err;


        results.forEach(appoint => {
            console.log(new Date(appoint.date).toDateString(), new Date().toDateString())
            console.log(new Date(appoint.date).toDateString() === new Date().toDateString())
            if (new Date(appoint.date).toDateString() === new Date().toDateString()) {
                arr.push(appoint);
            }
        })
        return res.json({
            status: "success",
            dailyApps: arr
        })

    })

})


router.get("/medhistory", loggedIn, (req, res) => {
    console.log("post history")
    db.query('SELECT * FROM patienthistory WHERE patientId = ?', req.user.id, (err, results) => {
        if (err) throw err;
        return res.json({
            medHistory: results
        });

    });

});
router.get("/visithistory", loggedIn, (req, res) => {
    // [req.user.id]
    db.query('SELECT * FROM appointments WHERE patientId = ?', req.user.id, (err, results) => {
        if (err) throw err;
        return res.json({
            visHistory: results
        });

    });

});

router.get("/doctor/:id", (req, res) => {
    db.query('SELECT * FROM doctors WHERE id = ?', [req.params.id], (err, results) => {
        if (err) throw err;
        res.json({
            doctorData: results[0]
        });

    });

});

router.get("/admin", (req, res) => {

    db.query('SELECT * FROM labrequest WHERE status = ?', ["pending"], (err, result2) => {
        if (err) throw err;
        else {
            res.json({
                labInfo: result2

            });
        }

    })

}

)

module.exports = router;