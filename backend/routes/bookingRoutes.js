// backend/routes/bookingRoutes.js
const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/bookingController');

// GET all bookings
router.get('/', bookingController.getAllBookings);

// POST create new booking
router.post('/', bookingController.createBooking);

// PUT update booking
router.put('/:id', bookingController.updateBooking);

// DELETE booking
router.delete('/:id', bookingController.deleteBooking);

module.exports = router;
