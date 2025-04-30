// backend/controllers/analyticsController.js
const db = require('../config/db');

// 1. Total Revenue from Completed Bookings
exports.getTotalRevenue = async (req, res) => {
  try {
    const [result] = await db.query(`
      SELECT SUM(total_cost) AS totalRevenue
      FROM Booking
      WHERE status = 'Completed'
    `);
    res.json(result[0]);
  } catch (error) {
    console.error('Error fetching total revenue:', error);
    res.status(500).send('Server Error');
  }
};

// 2. Top 3 Most Booked Services
exports.getTopServices = async (req, res) => {
    try {
      const [result] = await db.query(`
        SELECT s.name AS serviceName, COUNT(bs.id) AS timesBooked
        FROM Service s
        JOIN BookingService bs ON s.service_id = bs.service_id
        GROUP BY s.service_id
        ORDER BY timesBooked DESC
        LIMIT 3
      `);
      res.json(result);
    } catch (error) {
      console.error('Error fetching top services:', error);
      res.status(500).send('Server Error');
    }
  };
  

// 3. Bookings Count Per Pet
exports.getBookingsPerPet = async (req, res) => {
  try {
    const [result] = await db.query(`
      SELECT p.name AS petName, COUNT(b.booking_id) AS bookingCount
      FROM Pet p
      LEFT JOIN Booking b ON p.pet_id = b.pet_id
      GROUP BY p.pet_id
      ORDER BY bookingCount DESC
    `);
    res.json(result);
  } catch (error) {
    console.error('Error fetching bookings per pet:', error);
    res.status(500).send('Server Error');
  }
};

// 4. Monthly Booking Stats (Grouped by Month)
exports.getMonthlyBookings = async (req, res) => {
  try {
    const [result] = await db.query(`
      SELECT 
        DATE_FORMAT(start_date, '%Y-%m') AS month,
        COUNT(*) AS totalBookings,
        SUM(total_cost) AS monthlyRevenue
      FROM Booking
      GROUP BY month
      ORDER BY month ASC
    `);
    res.json(result);
  } catch (error) {
    console.error('Error fetching monthly bookings:', error);
    res.status(500).send('Server Error');
  }
};

exports.getBookingSummary = async (req, res) => {
    try {
      const [rows] = await db.query('SELECT * FROM BookingSummary');
      res.json(rows);
    } catch (err) {
      console.error(err);
      res.status(500).send('Server error');
    }
  };
  
  exports.getPetAges = async (req, res) => {
    try {
      const [rows] = await db.query(`
        SELECT name, species, GetPetAge(birth_date) AS age FROM Pet ORDER BY age DESC
      `);
      res.json(rows);
    } catch (err) {
      console.error(err);
      res.status(500).send('Server error');
    }
  };
  
  exports.getPetAgeDistribution = async (req, res) => {
    try {
      const [rows] = await db.query(`
        SELECT GetPetAge(birth_date) AS age, COUNT(*) AS count
        FROM Pet
        GROUP BY age
        ORDER BY age ASC
      `);
      res.json(rows);
    } catch (err) {
      console.error('Error fetching pet age distribution:', err);
      res.status(500).send('Server error');
    }
  };
  