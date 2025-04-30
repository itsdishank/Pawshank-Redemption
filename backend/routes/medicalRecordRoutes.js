// backend/routes/medicalRecordRoutes.js
const express = require('express');
const router = express.Router();
const medicalController = require('../controllers/medicalRecordController');

// Routes
router.get('/', medicalController.getAllRecords);
router.post('/', medicalController.createRecord);
router.put('/:id', medicalController.updateRecord);
router.delete('/:id', medicalController.deleteRecord);
router.get('/history/:petId', medicalController.getMedicalHistoryByPet);

module.exports = router;
