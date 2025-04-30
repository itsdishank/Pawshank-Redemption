import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Analytics = () => {
  const [revenue, setRevenue] = useState(null);
  const [topServices, setTopServices] = useState([]);
  const [bookingsPerPet, setBookingsPerPet] = useState([]);
  const [monthlyStats, setMonthlyStats] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/analytics/revenue').then(res => setRevenue(res.data.totalRevenue));
    axios.get('http://localhost:5000/api/analytics/top-services').then(res => setTopServices(res.data));
    axios.get('http://localhost:5000/api/analytics/bookings-per-pet').then(res => setBookingsPerPet(res.data));
    axios.get('http://localhost:5000/api/analytics/monthly-bookings').then(res => setMonthlyStats(res.data));
  }, []);

  return (
    <div style={{ padding: '1rem' }}>
      <h2>📊 Analytics</h2>

      <h3>Total Revenue</h3>
      <p>${revenue ?? 'Loading...'}</p>

      <h3>Top 3 Services</h3>
      <ul>
        {topServices.map(s => (
          <li key={s.serviceName}>{s.serviceName} — {s.timesBooked} times</li>
        ))}
      </ul>

      <h3>Bookings Per Pet</h3>
      <ul>
        {bookingsPerPet.map(b => (
          <li key={b.petName}>{b.petName} — {b.bookingCount} bookings</li>
        ))}
      </ul>

      <h3>Monthly Booking Summary</h3>
      <table border="1" cellPadding="6">
        <thead>
          <tr><th>Month</th><th>Bookings</th><th>Revenue</th></tr>
        </thead>
        <tbody>
          {monthlyStats.map(m => (
            <tr key={m.month}>
              <td>{m.month}</td>
              <td>{m.totalBookings}</td>
              <td>${m.monthlyRevenue}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Analytics;
