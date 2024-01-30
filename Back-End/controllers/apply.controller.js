const express = require('express');
const router = express.Router();
const applyService = require('../services/apply.service');
const doctorService = require('../services/doctor.service')
const labtechnicianService = require('../services/labtechnician.service')

const jwt = require("jsonwebtoken");

const bodyParser = require("body-parser");

router.use(bodyParser.urlencoded({
  extended: true
}));

const cookieParser = require('cookie-parser');
router.use(cookieParser());
// Create a new appointment
router.post('/', async (req, res) => {
    try {
      
      const application = req.body;
      if(req.body.token){
        const decoded = await jwt.verify(req.body.token.split("=")[1],
          process.env.JWT_SECRET
        );
          
          console.log("app", application)
          console.log("applying user id ",decoded, decoded.id)
          const result = await applyService.createApplication(application, decoded.id);
          console.log("application result",result)
          res.status(201).json(result);
        }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  router.post('/result', async (req, res) => {
    try {
      const {privilege, id, status} = req.body
      applyService.updateApplications(id, status)
        console.log("status is", status)
      if (status == "accepted"){
          console.log("Posting approval", privilege, req.body)
        if(privilege == "doctor"){
          console.log("creating doctor")
          const result = await doctorService.createDoctor(req.body)
          res.status(201).json(result);
        } else if (privilege =="labtechnician"){
          console.log("creating lab tech")
          const result = await labtechnicianService.createLabTechnician(req.body)
          res.status(201).json(result);
          }
      }
      
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  router.get('/', async (req, res) => {
    try {
      const applications = await applyService.getApplications()
      console.log("application requests",applications)
      res.status(201).json(applications);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });


module.exports = router;