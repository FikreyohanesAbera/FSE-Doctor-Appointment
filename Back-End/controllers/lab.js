


const express = require("express");
const db = require('../routes/db-config');
const bodyParser = require("body-parser");
const loggedIn = require("./loggedin");


const router = express.Router();
router.use(bodyParser.urlencoded({
    extended: true
}));


router.post("/labrequest", loggedIn, (req, res) => {
    let userId;
    let docName;
    console.log("uniqqqqqqqqqqq")
    db.query('SELECT id FROM users WHERE email = ?', [req.body.email], (err, results) => {
        if (err) throw err;
        else {
            userId = results[0].id;
            db.query('SELECT firstName,lastName FROM doctors WHERE id  = ?', [req.user.id], (err, results) => {

                if (err) throw err;
                else {
                    docName = results[0].firstName + results[0].lastName;
                    db.query('INSERT INTO labrequest SET ?', { userId: userId, doctorId: req.user.id, description: req.body.desc, adminId: 8, doctorName: docName, status: "pending", labTechName: req.body.name }, (err, resultss) => {
                        if (err) throw err;
                        else {
                            res.json({
                                status: "success",
                            })


                        }

                    })



                }
            })
        }
    })




})

router.post("/labTechReq",loggedIn, (req, res) => {
    let labreqId = req.body.labreqId;

        db.query("UPDATE labrequest SET status = ?  WHERE labreqId = ?", ["approved", labreqId], (err, innerresults) => {
            if (err) throw err;
        })
    })

router.post("/rejectlabapply",(req,res)=>{
    console.log("called")
    db.query("UPDATE labrequest SET status = ?  WHERE labreqId = ?", ["rejected", req.body.labreqId], (err, innerresults) => {
        if (err) throw err;
    })

})
router.post("/checkup",loggedIn,(req,res) => {
    console.log(req.body.date)
    db.query('INSERT INTO checkups SET ?',{
        doctorId: req.user.id,
        patientEmail: req.body.email,
        description: req.body.desc,
        date: req.body.date

    },(err) => {
        if (err) throw err;
        res.send("success")
    }
        )
})
router.post('/labtest', (req, res) => {
    const { fileName, description } = req.body;
  
    // Insert data into MySQL
    const sql = 'INSERT INTO your_table_name (fileName, description) VALUES (?, ?)';
    db.query(sql, [fileName, description], (err, result) => {
      if (err) {
        console.error('Error inserting data into MySQL:', err);
        res.status(500).json({ error: 'Internal Server Error' });
      } else {
        console.log('Data inserted into MySQL:', result);
        res.status(200).json({ message: 'Form submitted successfully' });
      }
    });
  });
module.exports = router;


