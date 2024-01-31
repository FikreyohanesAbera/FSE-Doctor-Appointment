const express = require("express");
const router = express.Router();
const loggedIn = require("../controllers/loggedin");
const db = require("./db-config");
const moment = require("moment");

// router.get('/apply', loggedIn, (req, res) => {
//     db.query('SELECT * FROM doctorapply WHERE senderId = ?', [req.user.id], (err, results) => {
//         console.log(results);
//         if (results.length > 0) {
//             res.render("apply", {
//                 status: "pending"
//             })
//         }
//         else {
//             res.render("apply", {
//                 status: ""
//             });
//         }

//     });

// })

function getDoctorName(doctorId) {
    return new Promise((resolve, reject) => {
        db.query("SELECT firstName FROM doctors WHERE id = ?", [doctorId], (err, doctorName) => {
            // console.log(doctorName[0])
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
        let time;
        if (err) throw err;
        if (results.length === 0) {
            time = 0
        }
        else {
            time = moment(results[0].time).endOf('day').fromNow().match(/\d+/g);
        }
        db.query("SELECT email FROM users WHERE id = ?", req.user.id, (error, responses) => {
            db.query('SELECT * FROM checkups WHERE patientEmail = ?', [responses[0].email], (err, results) => {
                if (err) throw err;
                let checkupArr = [];
                Promise.all(results.map(result => getDoctorName(result.doctorId)))
                    .then(doctorNames => {
                        for (let i = 0; i < results.length; i++) {
                            let checkup = { data: results[i], docName: doctorNames[i] };
                            checkupArr.push(checkup);

                        }

                        res.json({
                            remainingTime: time[0],
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
    // console.log(req.user.id);

    db.query('SELECT * FROM doctors WHERE userId = ?', [req.user.id], (err, results) => {
        if (err) throw err;
        // console.log(results)
        const correcteddata = {
            name: results[0].firstName + results[0].lastName,
            specialization: results[0].specialization,
            fromTime: results[0].fromTime,
            toTime: results[0].toTime,
        }
        res.json({
            data: correcteddata
        });

    });

});

router.post("/dailyvisits", loggedIn, (req, res) => {
    let arr = [];
  
    db.query("SELECT id FROM doctors WHERE userId = ?", req.user.id, (err, results1) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ status: "error", message: "Internal Server Error" });
      }
  
      db.query("SELECT * FROM appointments WHERE doctorId = ?", results1[0].id, (err, results) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ status: "error", message: "Internal Server Error" });
        }
  
        results.forEach(appoint => {
          if (new Date(appoint.date).toDateString() === new Date().toDateString()) {
            arr.push(appoint);
          }
        });
  
        processArray(arr)
          .then(() => {
            console.log(arr);
  
            return res.json({
              status: "success",
              dailyApps: arr
            });
          })
          .catch(error => {
            console.error(error);
            return res.status(500).json({ status: "error", message: "Internal Server Error" });
          });
      });
    });
  });
  
  const processArray = (arr) => {
    const promises = arr.map(elt => {
      return new Promise((resolve, reject) => {
        db.query("SELECT firstName FROM users WHERE id = ?", elt.patientid, (err, results3) => {
          if (err) {
            reject(err);
          } else {
            elt.patientName = results3[0].firstName;
            resolve();
          }
        });
      });
    });
  
    return Promise.all(promises);
  };

// router.get("/findadoc", (req, res) => {
//     db.query('SELECT * FROM doctors ORDER BY id LIMIT 6', (err, results) => {
//         if (err) throw err;
//         res.json({
//             doctorsData: results
//         });

//     });

// });

router.post("/patienthistory", loggedIn, (req, res) => {

    db.query('SELECT * FROM patienthistory WHERE patientId = ?', req.user.id, (err, results) => {
        if (err) throw err;
        res.json({
            medHistory: results

        })

        
        })


    })

router.get("/visithistory", loggedIn, (req, res) => {
    // [req.user.id]
    db.query('SELECT * FROM appointments WHERE patientId = ? AND ? > date', [1, new Date()], (err, results) => {
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



router.get("/labtech", loggedIn, (req, res) => {
    db.query('SELECT name FROM users WHERE id = ?', [req.user.id], (err, resultss) => {
        if (err) throw err;
        db.query("SELECT * FROM labrequest WHERE labtechName = ? AND status = ?", [resultss[0].name, "approved"], (err, results) => {
            if (err) throw err;
            res.render("labtech.ejs", {
                data: results
            })
        });

    })


})




module.exports = router;