import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Bookings = () => {
  const [bookings, setBookings] = useState([]);
  const [newBooking, setNewBooking] = useState({
    pet_id: '',
    start_date: '',
    end_date: '',
    status: '',
    total_cost: '',
  });
  const [editingId, setEditingId] = useState(null);
  const [editedBooking, setEditedBooking] = useState({});

  const fetchBookings = () => {
    axios.get('http://localhost:5000/api/bookings')
      .then(res => setBookings(res.data))
      .catch(err => console.error(err));
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const handleInputChange = (e) => {
    setNewBooking({ ...newBooking, [e.target.name]: e.target.value });
  };

  const handleAddBooking = (e) => {
    e.preventDefault();
    axios.post('http://localhost:5000/api/bookings', newBooking)
      .then(() => {
        fetchBookings();
        setNewBooking({ pet_id: '', start_date: '', end_date: '', status: '', total_cost: '' });
      })
      .catch(err => console.error(err));
  };

  const handleDelete = (id) => {
    if (window.confirm('Delete this booking?')) {
      axios.delete(`http://localhost:5000/api/bookings/${id}`)
        .then(() => fetchBookings())
        .catch(err => console.error(err));
    }
  };

  const handleEditClick = (booking) => {
    setEditingId(booking.booking_id);
    setEditedBooking({ ...booking });
  };

  const handleEditChange = (e) => {
    setEditedBooking({ ...editedBooking, [e.target.name]: e.target.value });
  };

  const handleSaveEdit = () => {
    axios.put(`http://localhost:5000/api/bookings/${editingId}`, editedBooking)
      .then(() => {
        fetchBookings();
        setEditingId(null);
        setEditedBooking({});
      })
      .catch(err => console.error(err));
  };

  return (
    <div style={{ padding: '1rem' }}>
      <h2>Bookings</h2>

      <form onSubmit={handleAddBooking} style={{ marginBottom: '1.5rem' }}>
        <input name="pet_id" placeholder="Pet ID" value={newBooking.pet_id} onChange={handleInputChange} required />
        <input name="start_date" placeholder="Start Date" value={newBooking.start_date} onChange={handleInputChange} required />
        <input name="end_date" placeholder="End Date" value={newBooking.end_date} onChange={handleInputChange} required />
        <input name="status" placeholder="Status" value={newBooking.status} onChange={handleInputChange} required />
        <input name="total_cost" placeholder="Total Cost" value={newBooking.total_cost} onChange={handleInputChange} required />
        <button type="submit">Add Booking</button>
      </form>

      <table border="1" cellPadding="8" style={{ width: '100%', backgroundColor: 'white' }}>
        <thead>
          <tr>
            <th>ID</th><th>Pet ID</th><th>Start Date</th><th>End Date</th><th>Status</th><th>Total Cost</th><th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((booking) => (
            <tr key={booking.booking_id}>
              <td>{booking.booking_id}</td>
              <td>
                {editingId === booking.booking_id ? (
                  <input name="pet_id" value={editedBooking.pet_id} onChange={handleEditChange} />
                ) : (
                  booking.pet_id
                )}
              </td>
              <td>
                {editingId === booking.booking_id ? (
                  <input name="start_date" value={editedBooking.start_date} onChange={handleEditChange} />
                ) : (
                  booking.start_date
                )}
              </td>
              <td>
                {editingId === booking.booking_id ? (
                  <input name="end_date" value={editedBooking.end_date} onChange={handleEditChange} />
                ) : (
                  booking.end_date
                )}
              </td>
              <td>
                {editingId === booking.booking_id ? (
                  <input name="status" value={editedBooking.status} onChange={handleEditChange} />
                ) : (
                  booking.status
                )}
              </td>
              <td>
                {editingId === booking.booking_id ? (
                  <input name="total_cost" value={editedBooking.total_cost} onChange={handleEditChange} />
                ) : (
                  `$${booking.total_cost}`
                )}
              </td>
              <td>
                {editingId === booking.booking_id ? (
                  <>
                    <button onClick={handleSaveEdit}>Save</button>
                    <button onClick={() => setEditingId(null)}>Cancel</button>
                  </>
                ) : (
                  <>
                    <button onClick={() => handleEditClick(booking)}>Edit</button>
                    <button onClick={() => handleDelete(booking.booking_id)}>Delete</button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Bookings;
