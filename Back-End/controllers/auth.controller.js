const express = require('express');
const router = express.Router();
const authService = require('../services/auth.service');
const bodyParser = require("body-parser");

router.use(bodyParser.urlencoded({
  extended: true
}));

  router.post('/signup', async (req, res) => {
    try {
      console.log("signup request", req.body)
      const patient = req.body;
      const {email, password, passwordConfirm} = patient  
      if (await authService.verifySignUp(email, password, passwordConfirm)){
        const { token, patient: savedPatient } = await authService.createAndSignIn(patient);
        const cookieOptions = {
          expires: new Date(
              Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000
          ),
          httpOnly: true
        }
        res.status(201).cookie('userSave', token, cookieOptions).send({message: "OK", token, cookieOptions})
        // .redirect("/patient");
      } else{
        res.status(300).send({message: "NotOK"})
      }

    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  
  router.post('/login', async (req, res) => {
    try {
      const { email, password, role } = req.body;
      console.log("role", req.body)
      if (!email || !password) {
          req.error1 = true;
          return res.status(400).sendFile("Please Provide an email and password"
          )
      }
      let verification = await authService.verifyLogin(role, email, password)
      
      
      if(verification){
        const token = authService.createToken(verification);
        
        console.log("verofication", verification)
        
        const cookieOptions = {
            expires: new Date(
                Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000
            ),
            httpOnly: true
        }
        // res.cookie('userSave', token, cookieOptions).send("what")
        res.status(200).cookie('userSave', token, cookieOptions).send({message: "OK", token, cookieOptions})
        // .redirect("/patient");
      } else {
          // res.redirect("/login?error=invalidPassword");
          res.status(406).send({message: "NOT OK"})
          
      }
      
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  
  router.all('/logout', async (req, res) => {
    console.log("logging out")
    try {
      console.log(res.cookie("userSave", { path: "http://localhost:5173/" }).userSave)
      res.status(200).clearCookie("userSave")
        .send("/");
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  
router.get('/me', async (req, res) => {
  try {
    // Get the patient's ID from the token
    const token = req.headers.authorization.split(' ')[1];
    const decoded = authService.verifyToken(token);
    const patientId = decoded.patientId;

    // Use the patient's ID to retrieve their information from the database
    const patient = await getPatientById(patientId);
    res.json(patient);
  } catch (error) {
    res.status(401).json({ message: 'Unauthorized' });
  }
});

module.exports = router;