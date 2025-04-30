import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Owners = () => {
  const [owners, setOwners] = useState([]);
  const [newOwner, setNewOwner] = useState({ first_name: '', last_name: '', phone: '', email: '' });
  const [editingOwnerId, setEditingOwnerId] = useState(null);
  const [editedOwner, setEditedOwner] = useState({});

  const fetchOwners = () => {
    axios.get('http://localhost:5000/api/owners')
      .then(res => setOwners(res.data))
      .catch(err => console.error(err));
  };

  useEffect(() => {
    fetchOwners();
  }, []);

  const handleInputChange = (e) => {
    setNewOwner({ ...newOwner, [e.target.name]: e.target.value });
  };

  const handleAddOwner = (e) => {
    e.preventDefault();
    axios.post('http://localhost:5000/api/owners', newOwner)
      .then(() => {
        fetchOwners();
        setNewOwner({ first_name: '', last_name: '', phone: '', email: '' });
      })
      .catch(err => console.error(err));
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this owner?')) {
      axios.delete(`http://localhost:5000/api/owners/${id}`)
        .then(() => fetchOwners())
        .catch(err => console.error(err));
    }
  };

  const handleEditClick = (owner) => {
    setEditingOwnerId(owner.owner_id);
    setEditedOwner({ ...owner });
  };

  const handleEditChange = (e) => {
    setEditedOwner({ ...editedOwner, [e.target.name]: e.target.value });
  };

  const handleSaveEdit = () => {
    axios.put(`http://localhost:5000/api/owners/${editingOwnerId}`, editedOwner)
      .then(() => {
        fetchOwners();
        setEditingOwnerId(null);
        setEditedOwner({});
      })
      .catch(err => console.error(err));
  };

  return (
    <div style={{ padding: '1rem' }}>
      <h2>Owners</h2>

      <form onSubmit={handleAddOwner} style={{ marginBottom: '1.5rem' }}>
        <input name="first_name" placeholder="First Name" value={newOwner.first_name} onChange={handleInputChange} required />
        <input name="last_name" placeholder="Last Name" value={newOwner.last_name} onChange={handleInputChange} required />
        <input name="phone" placeholder="Phone" value={newOwner.phone} onChange={handleInputChange} required />
        <input name="email" placeholder="Email" value={newOwner.email} onChange={handleInputChange} required />
        <button type="submit">Add Owner</button>
      </form>

      <table border="1" cellPadding="8" style={{ width: '100%', backgroundColor: 'white' }}>
        <thead>
          <tr>
            <th>ID</th><th>Name</th><th>Phone</th><th>Email</th><th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {owners.map((owner) => (
            <tr key={owner.owner_id}>
              <td>{owner.owner_id}</td>
              <td>
                {editingOwnerId === owner.owner_id ? (
                  <>
                    <input name="first_name" value={editedOwner.first_name} onChange={handleEditChange} />
                    <input name="last_name" value={editedOwner.last_name} onChange={handleEditChange} />
                  </>
                ) : (
                  `${owner.first_name} ${owner.last_name}`
                )}
              </td>
              <td>
                {editingOwnerId === owner.owner_id ? (
                  <input name="phone" value={editedOwner.phone} onChange={handleEditChange} />
                ) : (
                  owner.phone
                )}
              </td>
              <td>
                {editingOwnerId === owner.owner_id ? (
                  <input name="email" value={editedOwner.email} onChange={handleEditChange} />
                ) : (
                  owner.email
                )}
              </td>
              <td>
                {editingOwnerId === owner.owner_id ? (
                  <>
                    <button onClick={handleSaveEdit}>Save</button>
                    <button onClick={() => setEditingOwnerId(null)}>Cancel</button>
                  </>
                ) : (
                  <>
                    <button onClick={() => handleEditClick(owner)}>Edit</button>
                    <button onClick={() => handleDelete(owner.owner_id)}>Delete</button>
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

export default Owners;
