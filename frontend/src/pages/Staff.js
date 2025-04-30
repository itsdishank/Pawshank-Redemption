import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Staff = () => {
  const [staffList, setStaffList] = useState([]);
  const [newStaff, setNewStaff] = useState({ first_name: '', last_name: '', role: '', phone: '', email: '' });
  const [editingId, setEditingId] = useState(null);
  const [editedStaff, setEditedStaff] = useState({});

  const fetchStaff = () => {
    axios.get('http://localhost:5000/api/staff')
      .then(res => setStaffList(res.data))
      .catch(err => console.error(err));
  };

  useEffect(() => {
    fetchStaff();
  }, []);

  const handleInputChange = (e) => {
    setNewStaff({ ...newStaff, [e.target.name]: e.target.value });
  };

  const handleAddStaff = (e) => {
    e.preventDefault();
    axios.post('http://localhost:5000/api/staff', newStaff)
      .then(() => {
        fetchStaff();
        setNewStaff({ first_name: '', last_name: '', role: '', phone: '', email: '' });
      })
      .catch(err => console.error(err));
  };

  const handleDelete = (id) => {
    if (window.confirm('Delete this staff member?')) {
      axios.delete(`http://localhost:5000/api/staff/${id}`)
        .then(() => fetchStaff())
        .catch(err => console.error(err));
    }
  };

  const handleEditClick = (staff) => {
    setEditingId(staff.staff_id);
    setEditedStaff({ ...staff });
  };

  const handleEditChange = (e) => {
    setEditedStaff({ ...editedStaff, [e.target.name]: e.target.value });
  };

  const handleSaveEdit = () => {
    axios.put(`http://localhost:5000/api/staff/${editingId}`, editedStaff)
      .then(() => {
        fetchStaff();
        setEditingId(null);
        setEditedStaff({});
      })
      .catch(err => console.error(err));
  };

  return (
    <div style={{ padding: '1rem' }}>
      <h2>Staff Members</h2>

      <form onSubmit={handleAddStaff} style={{ marginBottom: '1.5rem' }}>
        <input name="first_name" placeholder="First Name" value={newStaff.first_name} onChange={handleInputChange} required />
        <input name="last_name" placeholder="Last Name" value={newStaff.last_name} onChange={handleInputChange} required />
        <input name="role" placeholder="Role" value={newStaff.role} onChange={handleInputChange} required />
        <input name="phone" placeholder="Phone" value={newStaff.phone} onChange={handleInputChange} required />
        <input name="email" placeholder="Email" value={newStaff.email} onChange={handleInputChange} required />
        <button type="submit">Add Staff</button>
      </form>

      <table border="1" cellPadding="8" style={{ width: '100%', backgroundColor: 'white' }}>
        <thead>
          <tr>
            <th>ID</th><th>Name</th><th>Role</th><th>Phone</th><th>Email</th><th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {staffList.map((staff) => (
            <tr key={staff.staff_id}>
              <td>{staff.staff_id}</td>
              <td>
                {editingId === staff.staff_id ? (
                  <>
                    <input name="first_name" value={editedStaff.first_name} onChange={handleEditChange} />
                    <input name="last_name" value={editedStaff.last_name} onChange={handleEditChange} />
                  </>
                ) : (
                  `${staff.first_name} ${staff.last_name}`
                )}
              </td>
              <td>
                {editingId === staff.staff_id ? (
                  <input name="role" value={editedStaff.role} onChange={handleEditChange} />
                ) : (
                  staff.role
                )}
              </td>
              <td>
                {editingId === staff.staff_id ? (
                  <input name="phone" value={editedStaff.phone} onChange={handleEditChange} />
                ) : (
                  staff.phone
                )}
              </td>
              <td>
                {editingId === staff.staff_id ? (
                  <input name="email" value={editedStaff.email} onChange={handleEditChange} />
                ) : (
                  staff.email
                )}
              </td>
              <td>
                {editingId === staff.staff_id ? (
                  <>
                    <button onClick={handleSaveEdit}>Save</button>
                    <button onClick={() => setEditingId(null)}>Cancel</button>
                  </>
                ) : (
                  <>
                    <button onClick={() => handleEditClick(staff)}>Edit</button>
                    <button onClick={() => handleDelete(staff.staff_id)}>Delete</button>
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

export default Staff;
