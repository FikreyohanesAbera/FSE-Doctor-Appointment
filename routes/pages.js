const express = require("express");
const router = express.Router();
const loggedIn = require("../controllers/loggedin");
const logout = require("../controllers/logout");
const db = require("./db-config");
const moment = require("moment");




router.get('/', (req, res) => {
    res.sendFile("home.html", { root: './public/' })
});
router.get('/register', (req, res) => {
    res.sendFile("register.html", { root: './public/' })
});
router.get('/login', (req, res) => {    

    res.sendFile("login.html", { root: './public/' })
});
router.get('/logout', logout);
router.get('/apply',loggedIn,(req,res) => {
    db.query('SELECT * FROM doctorapply WHERE senderId = ?',[req.user.id],(err,results) => {
        console.log(results);
        if (results.length > 0){
            res.render("apply",{
                status: "pending"
            })
        }
        else{
            res.render("apply",{
                status: ""
            });
        }

    });

})

router.get('/book', (req,res) => {
    res.sendFile("book.html",{root: './public/'})
})
router.get("/patient",loggedIn,(req,res) => {
    console.log("herer")
    // will change to [req.user.id]

    db.query('SELECT * FROM appointments WHERE patientid = ?',7,(err,results) => {
        let time;
        if (err) throw err;
        if (results.length === 0){
            time= 0
        }
        else{
            time = moment(results[0].time).endOf('day').fromNow().match(/\d+/g);        
        }
        // will change to [req.user.id]
        db.query("SELECT email FROM users WHERE id = ?",7,(error,responses) => {
            db.query('SELECT * FROM checkups WHERE patientEmail = ?',[responses[0].email],(err,results) => {
                if (err) throw err;
                db.query("SELECT name FROM doctors WHERE id = ?",[results[0].doctorId],(errr,doctorName)=> {
                    res.json({
                        remainingTime: time[0],
                        checkup: {data: results[0],docName: doctorName[0] && doctorName[0].name }
                    });
                    

                })



            })


        })




        
    });

})
router.get("/doctorProfile",loggedIn,(req,res) => {

    db.query('SELECT * FROM doctors WHERE userId = ?',[req.user.id],(err,results) => {
        if (err) throw err;
        const correcteddata = {
            name: results[0].name,
            specialization: results[0].specialization,
            fromTime: moment(results[0].fromTime).format("LT"),
            toTime: moment(results[0].toTime).format("LT")

        }
        res.json({
            data: correcteddata
        });
        
    });

});
router.get("/dailyvisits",(req,res) => {
    let arr = [];
    // write [req.user.id]
    console.log("ffffffffff")
    db.query("SELECT * FROM appointments WHERE doctorId = ?",7,(err,results) => {
        if (err) throw err;
        console.log(results.length)


        results.forEach(appoint => {
            console.log(new Date(appoint.date).toDateString() , new Date().toDateString() )
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
router.get("/payment",(req,res) => {
    res.sendFile("payment.html",{root: './public/'})

})

router.get("/findadoc",(req,res) => {
    db.query('SELECT * FROM doctors ORDER BY id LIMIT 6',(err,results) => {
        if (err) throw err;
        res.json({
            doctorsData: results
        });
        
    });

});
router.get("/patienthistory",loggedIn,(req,res) => {
    // [req.user.id]
    db.query('SELECT * FROM patienthistory WHERE patientId = ?',2,(err,results) => {
        if (err) throw err;
        return res.json({
            medHistory: results
        });
        
    });

});
router.get("/visithistory",loggedIn,(req,res) => {
    // [req.user.id]
    db.query('SELECT * FROM appointments WHERE patientId = ? AND ? > date',[1,new Date()],(err,results) => {
        if (err) throw err;
        return res.json({
            visHistory: results
        });
        
    });

});

router.get("/doctor/:id",(req,res) => {
    console.log(req.params.id)
    db.query('SELECT * FROM doctors WHERE id = ?',[req.params.id],(err,results) => {
        if (err) throw err;
        res.json({
            doctorData: results[0]
        });
        
    });

});

router.get("/admin",(req,res) => {
    db.query('SELECT * FROM doctorapply WHERE RecipientId = 8', (err, result1) =>{
        if (err) throw err;
        else{
            db.query('SELECT * FROM labrequest WHERE status = ?',["pending"], (err, result2) =>{
                if (err) throw err;
                else{
                    console.log(result1,result2);
                    res.json({
                        docInfo: result1,
                        labInfo: result2
                    
                    });
                }
        
            })

        }

    })


})

router.get("/labtech",loggedIn,(req,res) => {
    db.query('SELECT name FROM users WHERE id = ?',[req.user.id],(err,resultss) => {
        if (err) throw err;
        db.query("SELECT * FROM labrequest WHERE labtechName = ? AND status = ?",[resultss[0].name,"approved"],(err,results) => {
            if (err) throw err;
            res.render("labtech.ejs",{
                data: results
            })
        });
    
    })
    

})

router.get("/data",(req,res) => {
    console.log("requested")
    res.json({msg: "hello"});
});


module.exports = router;