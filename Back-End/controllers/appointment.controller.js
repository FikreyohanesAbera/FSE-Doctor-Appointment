const express = require('express');
const router = express.Router();
const appointmentsService = require('../services/appointment.service');

// Create a new appointment
router.post('/', async (req, res) => {
  try {
    const result = await appointmentsService.bookAppointment(req, res);
    if (result) res.status(201).json(result);
    else res.redirect("/book?error=AppointmentUnavailable");
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});




// router.post("/submit", loggedIn, bookAppointment);






// Get appointments by doctor id
router.get('/doctor/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const result = await appointmentsService.getAppointmentsByDoctorId(id);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get appointments by patient id
router.get('/patient/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const result = await appointmentsService.getAppointmentsByPatientId(id);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update an appointment
router.put('/:id', async (req, res) => {
    try {
      const id = req.params.id;
      const appointment = req.body;
      const result = await appointmentsService.updateAppointment(appointment);
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

// Delete an appointment
router.delete('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    await appointmentsService.deleteAppointment(id);
    res.status(200).json({ message: 'Appointment deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;