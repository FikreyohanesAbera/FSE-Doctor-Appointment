const express = require("express");
const router = express.Router();
const loggedIn = require("../controllers/loggedin");
const logout = require("../controllers/logout");


router.get('/', (req, res) => {
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
router.get('/apply',(req,res) => {
    res.sendFile("apply.html",{root: './public/'});
})

router.get('/book', (req,res) => {
    res.sendFile("book.html",{root: './public/'})
})
router.get("/patient",(req,res) => {
    res.sendFile("patient.html",{root: './public/'})

})
router.get("/payment",(req,res) => {
    res.sendFile("payment.html",{root: './public/'})

})

module.exports = router;