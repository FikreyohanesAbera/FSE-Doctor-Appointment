const express = require("express");
const router = express.Router();
const userService = require("../services/user.service");
const cookieParser = require("cookie-parser");
router.use(cookieParser());
const jwt = require("jsonwebtoken");

const bodyParser = require("body-parser");

router.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

// Create a new patient account
router.post("/create", async (req, res) => {
  try {
    const patient = req.body;
    const result = await patientsService.createPatient(patient);
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update a patient account
router.put("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const updates = req.body;
    const result = await patientsService.updatePatient(id, updates);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get a patient account or all patient accounts
router.post("/profile", async (req, res) => {
  try {

    if (req.body.token) {
      const decoded = await jwt.verify(
        req.body.token.split("=")[1],
        process.env.JWT_SECRET
      );
      // console.log("hit get patient controller", decoded.id, decoded);
      const id = decoded.id;
      let result;
      if (id) {
        result = await userService.getUser(id, decoded.role);
        // console.log(result, "sent user");
      }
      // else {
      //   result = await patientsService.getPatients();
      // }
      res.status(200).json(result);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete a patient account
router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    await patientsService.deletePatient(id);
    res.status(200).json({ message: "Patient account deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
