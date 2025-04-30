import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Invoices = () => {
  const [invoices, setInvoices] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/invoices')
      .then(res => setInvoices(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div style={{ padding: '1rem' }}>
      <h2>Invoices</h2>
      <table border="1" cellPadding="8" style={{ width: '100%', backgroundColor: 'white' }}>
        <thead>
          <tr>
            <th>Invoice ID</th>
            <th>Booking ID</th>
            <th>Amount</th>
            <th>Invoice Date</th>
          </tr>
        </thead>
        <tbody>
          {invoices.map(inv => (
            <tr key={inv.invoice_id}>
              <td>{inv.invoice_id}</td>
              <td>{inv.booking_id}</td>
              <td>${parseFloat(inv.amount).toFixed(2)}</td>
              <td>{inv.invoice_date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Invoices;
