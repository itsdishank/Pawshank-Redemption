// backend/controllers/bookingController.js
const db = require('../config/db');

// GET all Bookings
exports.getAllBookings = async (req, res) => {
  try {
    const [bookings] = await db.query('SELECT * FROM Booking');
    res.json(bookings);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
};

// POST Create new Booking
exports.createBooking = async (req, res) => {
  try {
    const { pet_id, start_date, end_date, status, total_cost } = req.body;
    await db.query(
      'INSERT INTO Booking (pet_id, start_date, end_date, status, total_cost) VALUES (?, ?, ?, ?, ?)',
      [pet_id, start_date, end_date, status, total_cost]
    );
    res.status(201).send('Booking created successfully');
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
};

// PUT Update a Booking
exports.updateBooking = async (req, res) => {
  try {
    const { id } = req.params;
    const { pet_id, start_date, end_date, status, total_cost } = req.body;
    await db.query(
      'UPDATE Booking SET pet_id=?, start_date=?, end_date=?, status=?, total_cost=? WHERE booking_id=?',
      [pet_id, start_date, end_date, status, total_cost, id]
    );
    res.send('Booking updated successfully');
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
};

// DELETE a Booking
exports.deleteBooking = async (req, res) => {
  try {
    const { id } = req.params;
    await db.query('DELETE FROM Booking WHERE booking_id = ?', [id]);
    res.send('Booking deleted successfully');
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
};
