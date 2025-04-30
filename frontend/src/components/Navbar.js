import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => (
  <nav style={{ display: 'flex', gap: '1rem', padding: '1rem' }}>
    <Link to="/">Home</Link>
    <Link to="/owners">Owners</Link>
    <Link to="/pets">Pets</Link>
    <Link to="/bookings">Bookings</Link>
    <Link to="/services">Services</Link>
    <Link to="/staff">Staff</Link>
    <Link to="/medicalrecords">Medical</Link>
    <Link to="/analytics">Analytics</Link>
    <Link to="/booking-summary">📄 Booking Summary</Link>
    <Link to="/invoices">🧾 Invoices</Link>

  </nav>
);

export default Navbar;
