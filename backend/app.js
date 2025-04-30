// backend/app.js
const express = require('express');
const cors = require('cors');
require('dotenv').config();

const ownerRoutes = require('./routes/ownerRoutes');
const petRoutes = require('./routes/petRoutes'); // Import pet routes
const bookingRoutes = require('./routes/bookingRoutes');
const staffRoutes = require('./routes/staffRoutes');
const medicalRecordRoutes = require('./routes/medicalRecordRoutes');
const analyticsRoutes = require('./routes/analyticsRoutes');
const serviceRoutes = require('./routes/serviceRoutes');
const invoiceRoutes = require('./routes/invoiceRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/owners', ownerRoutes);
app.use('/api/pets', petRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/staff', staffRoutes);
app.use('/api/medicalrecords', medicalRecordRoutes);
app.use('/api/analytics', analyticsRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/invoices', invoiceRoutes);

// Home Route
app.get('/', (req, res) => {
  res.send('Welcome to Pet Kennel Management System API');
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

const db = require('./config/db');

// Test Database Connection
db.getConnection()
  .then(conn => {
    console.log('✅ Database connection successful!');
    conn.release();
  })
  .catch(err => {
    console.error('❌ Database connection failed:', err.message);
  });
