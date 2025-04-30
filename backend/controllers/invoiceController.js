// backend/controllers/invoiceController.js
const db = require('../config/db');

exports.getAllInvoices = async (req, res) => {
    try {
      const [rows] = await db.query('SELECT * FROM Invoice ORDER BY invoice_id DESC');
      res.json(rows);
    } catch (err) {
      console.error(err);
      res.status(500).send('Server error');
    }
  };
  