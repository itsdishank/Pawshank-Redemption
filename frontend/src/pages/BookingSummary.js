import React, { useEffect, useState } from 'react';
import axios from 'axios';

const BookingSummary = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/analytics/booking-summary')
      .then(res => setBookings(res.data))
      .catch(err => console.error('Error fetching summary:', err));
  }, []);

  return (
    <div style={{ padding: '1rem' }}>
      <h2>Booking Summary</h2>

      <table border="1" cellPadding="8" style={{ width: '100%', backgroundColor: 'white' }}>
        <thead>
          <tr>
            <th>Booking ID</th>
            <th>Pet Name</th>
            <th>Owner Name</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Status</th>
            <th>Total Cost</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map(b => (
            <tr key={b.booking_id}>
              <td>{b.booking_id}</td>
              <td>{b.pet_name}</td>
              <td>{b.owner_name}</td>
              <td>{b.start_date}</td>
              <td>{b.end_date}</td>
              <td>{b.status}</td>
              <td>${parseFloat(b.total_cost).toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BookingSummary;
