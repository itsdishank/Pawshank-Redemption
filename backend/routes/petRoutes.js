// backend/routes/petRoutes.js
const express = require('express');
const router = express.Router();
const petController = require('../controllers/petController');

// GET all pets
router.get('/', petController.getAllPets);

// POST create new pet
router.post('/', petController.createPet);

// PUT update a pet
router.put('/:id', petController.updatePet);

// DELETE a pet
router.delete('/:id', petController.deletePet);

module.exports = router;
