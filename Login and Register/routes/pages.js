const express = require("express");
const router = express.Router();
const loggedIn = require("../controllers/loggedin");
const logout = require("../controllers/logout");


router.get('/', loggedIn, (req, res) => {
    if (req.user){
        res.sendFile("patient.html", { root: './public/' })
    }
    res.sendFile("home.html", { root: './public/' })
});
router.get('/register', (req, res) => {
    res.sendFile("register.html", { root: './public/' })
});
router.get('/login', (req, res) => {    

    res.sendFile("login.html", { root: './public/' })
});
router.get('/logout', logout);
module.exports = router;