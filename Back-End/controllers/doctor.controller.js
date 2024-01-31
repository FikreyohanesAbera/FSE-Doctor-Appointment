const express = require('express');
const router = express.Router();
const doctorsService = require('../services/doctor.service');

// Create a new doctor account
router.post('/', async (req, res) => {
  try {
    const doctor = req.body;
    const result = await doctorsService.createDoctor(doctor);
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update a doctor account
router.put('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const updates = req.body;
    const result = await doctorsService.updateDoctor(id, updates);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get a doctor account or all doctor accounts
router.get('/:id?', async (req, res) => {
  try {
    const id = req.params.id;
    let result;
    if (id) {
      result = await doctorsService.getDoctor(id);
    } else {
      result = await doctorsService.getDoctors();
    }
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/', async (req, res) => {
  try {
    result = await doctorsService.getDoctors();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete a doctor account
router.delete('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    await doctorsService.deleteDoctor(id);
    res.status(200).json({ message: 'Doctor account deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;