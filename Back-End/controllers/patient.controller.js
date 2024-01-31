const express = require("express");
const router = express.Router();
const userService = require("../services/user.service");
const cookieParser = require("cookie-parser");
router.use(cookieParser());
const jwt = require("jsonwebtoken");
import {patientService} from "../services/patient.service";
import { loggedIn } from "../services/loggedIn";

const bodyParser = require("body-parser");

router.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

router.get("/patientData", loggedIn, (req, res) => {
    let body = req.body;
    return patientService.getPatient(body,req.user.id);

})