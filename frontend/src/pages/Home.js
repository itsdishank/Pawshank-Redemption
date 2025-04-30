import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <h1 style={{ fontSize: '2.5rem', color: '#007bff' }}>🐾 Pawshank Redemption</h1>
      <p style={{ fontSize: '1.2rem', marginTop: '1rem', maxWidth: '700px', margin: 'auto' }}>
        Welcome to <strong>Pawshank Redemption</strong> – a comprehensive pet kennel management system designed
        to help boarding facilities manage pets, owners, bookings, services, staff, and medical records with ease.
        Our platform provides efficient operations, automated billing, real-time analytics, and a user-friendly interface.
        Whether you're grooming, feeding, or boarding, Pawshank Redemption is your all-in-one solution.
      </p>

      <div style={{ marginTop: '2.5rem' }}>
        <h2>Quick Links</h2>
        <ul style={{ listStyle: 'none', padding: 0, lineHeight: '2', fontSize: '1.1rem' }}>
          <li><Link to="/owners">👤 View Owners</Link></li>
          <li><Link to="/pets">🐶 View Pets</Link></li>
          <li><Link to="/bookings">📅 View Bookings</Link></li>
          <li><Link to="/services">💈 View Services</Link></li>
          <li><Link to="/staff">🧑‍⚕️ View Staff</Link></li>
          <li><Link to="/medicalrecords">🩺 View Medical Records</Link></li>
          <li><Link to="/analytics">📊 View Analytics</Link></li>
          <li><Link to="/booking-summary">📄 Booking Summary</Link></li>
          <li><Link to="/invoices">🧾 View Invoices</Link></li>
          <li><Link to="/analytics/pet-age-chart">📊 Pet Age Chart</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Home;
