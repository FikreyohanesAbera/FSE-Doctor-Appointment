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

router.post('/register', (req, res) => {
    const { name, email, password, passwordConfirm } = req.body;
    if (!email || !password) {
 
        res.redirect("/registererror?=missingdata");
    }
    else {
        db.query('SELECT email from users WHERE email = ?', [email], async (err, results) => {
            if (err) {
                throw err;
            } else {
                if (results.length > 0) {
                    res.redirect("/register?error=existingemail");


                } else if (password != passwordConfirm) {
                    res.redirect("/register?error=mismatchingpassword");

                }
            }

            let hashedPassword = await bcrypt.hash(password, 8);

            db.query('INSERT INTO users SET ?', { name: name, email: email, password: hashedPassword }, (err, results) => {
                if (err) {
                    throw err;
                } else {
                            
                    res.sendFile(path.join(__dirname, '..', 'public', 'login.html'));
                }
            })
        })

    }

}

);
router.post('/login', (req, res) => {

    const { email, password } = req.body;
    if (!email || !password) {
        req.error1 = true;
        return res.status(400).sendFile(__dirname + "/login.html", {
            error: "Please Provide an email and password"
        })
    }
    db.query('SELECT * FROM users WHERE email = ?', [email], async (err, results) => {
        if (err) throw err;
        if (!results || !await bcrypt.compare(password, results[0].password)) {
            req.error2 = true;
            // res.json({
            //     status: "error",
            //     error: 'Email or Password is incorrect'
            // })
            res.redirect("/login?error=invalidPassword");


        } else {
            const id = results[0].id;

            const token = jwt.sign({ id }, process.env.JWT_SECRET, {
                expiresIn: process.env.JWT_EXPIRES_IN
            });
            const cookieOptions = {
                expires: new Date(
                    Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000
                ),
                httpOnly: true
            }
            res.cookie('userSave', token, cookieOptions);

            return res.sendFile(path.join(__dirname, '..', 'public', 'patient.html'));
        }
    });

});


// router.get('/logout', logout);

module.exports = router;