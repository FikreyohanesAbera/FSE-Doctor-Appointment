const express = require("express");
const router = express.Router();
const loggedIn = require("../controllers/loggedin");
const logout = require("../controllers/logout");
const path = require("path");

router.get("/", loggedIn, (req, res) => {
  res.sendFile(path.join(__dirname, "..", "public", "home.html"));
});
router.get("/register", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "public", "register.html"));
});
router.get("/login", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "public", "login.html"));
});

router.get("/logout", logout);
router.get("/apply", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "public", "apply.html"));
});

router.get("/book", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "public", "book.html"));
});
router.get("/patient", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "public", "patient.html"));
});
router.get("/payment", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "public", "payment.html"));
});

router.get("/findDoctor", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "public", "findDoctor.html"));
})
router.get("/script", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "public", "script.js"));
})
router.get("/success", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "public", "success.html"));
})
router.get("/cancel", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "public", "cancel.html"));
})

module.exports = router;
