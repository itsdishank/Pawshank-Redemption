// backend/routes/analyticsRoutes.js
const express = require('express');
const router = express.Router();
const analyticsController = require('../controllers/analyticsController');

// Routes for complex queries
router.get('/revenue', analyticsController.getTotalRevenue);
router.get('/top-services', analyticsController.getTopServices);
router.get('/bookings-per-pet', analyticsController.getBookingsPerPet);
router.get('/monthly-bookings', analyticsController.getMonthlyBookings);
router.get('/booking-summary', analyticsController.getBookingSummary);
router.get('/pet-ages', analyticsController.getPetAges);
router.get('/pet-age-distribution', analyticsController.getPetAgeDistribution);

module.exports = router;
