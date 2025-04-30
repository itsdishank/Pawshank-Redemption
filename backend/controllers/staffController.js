// backend/controllers/staffController.js
const db = require('../config/db');

// GET all staff
exports.getAllStaff = async (req, res) => {
  try {
    const [staff] = await db.query('SELECT * FROM Staff');
    res.json(staff);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
};

// POST create new staff
exports.createStaff = async (req, res) => {
  try {
    const { first_name, last_name, role, phone, email } = req.body;
    await db.query(
      'INSERT INTO Staff (first_name, last_name, role, phone, email) VALUES (?, ?, ?, ?, ?)',
      [first_name, last_name, role, phone, email]
    );
    res.status(201).send('Staff member added');
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
};

// PUT update staff
exports.updateStaff = async (req, res) => {
  try {
    const { id } = req.params;
    const { first_name, last_name, role, phone, email } = req.body;
    await db.query(
      'UPDATE Staff SET first_name=?, last_name=?, role=?, phone=?, email=? WHERE staff_id=?',
      [first_name, last_name, role, phone, email, id]
    );
    res.send('Staff member updated');
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
};

// DELETE staff
exports.deleteStaff = async (req, res) => {
  try {
    const { id } = req.params;
    await db.query('DELETE FROM Staff WHERE staff_id = ?', [id]);
    res.send('Staff member deleted');
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
};
