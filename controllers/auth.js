const express = require("express");
const jwt =  require("jsonwebtoken");
const db = require('../routes/db-config');
const bcrypt = require("bcryptjs");
const path = require("path");
const bodyParser = require("body-parser");



const router = express.Router();
router.use(bodyParser.urlencoded({
    extended: true
  }));

router.post('/api/register', (req, res) => {
    const { name, email, password, passwordConfirm } = req.body;
    if (!email || !password) {
 
        return res.json({
            status: "error",
            message: "missingdata"
        });
    }
    else {
        db.query('SELECT email from users WHERE email = ?', [email], async (err, results) => {
            if (err) {
                throw err;
            } else {
                if (results.length > 0) {
                    return res.json({
                        status: "error",
                        message: "existingemail"
                    })


                } else if (password != passwordConfirm) {
                    return res.json({
                        status: "error",
                        message: "mismatchingpassword"
                    })

                }
            }

            let hashedPassword = await bcrypt.hash(password, 8);

            db.query('INSERT INTO users SET ?', { name: name, email: email, password: hashedPassword }, (err, results) => {
                if (err) {
                    throw err;
                } else {
                    res.json({
                        status: "success"
                    });
                }
            })
        })

    }

}

);
router.post('/api/login', (req, res) => {
    console.log("ifdsssssssssssssss")

    const { email, password } = req.body;
    if (!email || !password) {
        req.error1 = true;
        return res.status(400).json({
            error: "Please Provide an email and password"
        })
    }
    db.query('SELECT * FROM users WHERE email = ?', [email], async (err, results) => {
        if (err) throw err;
        if (!results || !await bcrypt.compare(password, results[0].password)) {
            req.error2 = true;
            res.json({
                status: "error",
                message: "invalidPassword"
            });


        } else {
            const id = results[0].id;
            console.log(id);

            const token = jwt.sign({ id }, process.env.JWT_SECRET, {
                expiresIn: process.env.JWT_EXPIRES_IN
            });
            console.log(token)
            const cookieOptions = {
                expires: new Date(
                    Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000,
                ),
                httpOnly: true,
            }
            res.cookie('userSave', token, cookieOptions);
            console.log(req.cookies.userSave);
            db.query('SELECT * FROM doctors WHERE userId = ?',[id],(err,resultss) => {
                if (err) throw err;
                console.log(resultss)
                if (resultss.length !== 0){
                    // res.redirect('/doctorProfile');
                    res.json({
                        status: "success",
                        user:"doctor"

                    })
                }
                else{
                    // res.redirect("/patient");
                    res.json({
                        status:"success",
                        user:"patient"
                    })
                    
                }                
            });
          
        }
    });

});


// router.get('/logout', logout);

module.exports = router;