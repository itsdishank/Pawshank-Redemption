import React, { useEffect, useState } from 'react';
import axios from 'axios';

const MedicalRecords = () => {
  const [records, setRecords] = useState([]);
  const [newRecord, setNewRecord] = useState({ pet_id: '', description: '', record_date: '', vet_name: '' });
  const [editingId, setEditingId] = useState(null);
  const [editedRecord, setEditedRecord] = useState({});

  const fetchRecords = () => {
    axios.get('http://localhost:5000/api/medicalrecords')
      .then(res => setRecords(res.data))
      .catch(err => console.error(err));
  };

  useEffect(() => {
    fetchRecords();
  }, []);

  const handleInputChange = (e) => {
    setNewRecord({ ...newRecord, [e.target.name]: e.target.value });
  };

  const handleAddRecord = (e) => {
    e.preventDefault();
    axios.post('http://localhost:5000/api/medicalrecords', newRecord)
      .then(() => {
        fetchRecords();
        setNewRecord({ pet_id: '', description: '', record_date: '', vet_name: '' });
      })
      .catch(err => console.error(err));
  };

  const handleDelete = (id) => {
    if (window.confirm('Delete this medical record?')) {
      axios.delete(`http://localhost:5000/api/medicalrecords/${id}`)
        .then(() => fetchRecords())
        .catch(err => console.error(err));
    }
  };

  const handleEditClick = (record) => {
    setEditingId(record.record_id);
    setEditedRecord({ ...record });
  };

  const handleEditChange = (e) => {
    setEditedRecord({ ...editedRecord, [e.target.name]: e.target.value });
  };

  const handleSaveEdit = () => {
    axios.put(`http://localhost:5000/api/medicalrecords/${editingId}`, editedRecord)
      .then(() => {
        fetchRecords();
        setEditingId(null);
        setEditedRecord({});
      })
      .catch(err => console.error(err));
  };

  return (
    <div style={{ padding: '1rem' }}>
      <h2>Medical Records</h2>

      <form onSubmit={handleAddRecord} style={{ marginBottom: '1.5rem' }}>
        <input name="pet_id" placeholder="Pet ID" value={newRecord.pet_id} onChange={handleInputChange} required />
        <input name="description" placeholder="Description" value={newRecord.description} onChange={handleInputChange} required />
        <input name="record_date" placeholder="Date" value={newRecord.record_date} onChange={handleInputChange} required />
        <input name="vet_name" placeholder="Vet Name" value={newRecord.vet_name} onChange={handleInputChange} required />
        <button type="submit">Add Record</button>
      </form>

      <table border="1" cellPadding="8" style={{ width: '100%', backgroundColor: 'white' }}>
        <thead>
          <tr>
            <th>ID</th><th>Pet ID</th><th>Description</th><th>Date</th><th>Vet</th><th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {records.map((record) => (
            <tr key={record.record_id}>
              <td>{record.record_id}</td>
              <td>
                {editingId === record.record_id ? (
                  <input name="pet_id" value={editedRecord.pet_id} onChange={handleEditChange} />
                ) : (
                  record.pet_id
                )}
              </td>
              <td>
                {editingId === record.record_id ? (
                  <input name="description" value={editedRecord.description} onChange={handleEditChange} />
                ) : (
                  record.description
                )}
              </td>
              <td>
                {editingId === record.record_id ? (
                  <input name="record_date" value={editedRecord.record_date} onChange={handleEditChange} />
                ) : (
                  record.record_date
                )}
              </td>
              <td>
                {editingId === record.record_id ? (
                  <input name="vet_name" value={editedRecord.vet_name} onChange={handleEditChange} />
                ) : (
                  record.vet_name
                )}
              </td>
              <td>
                {editingId === record.record_id ? (
                  <>
                    <button onClick={handleSaveEdit}>Save</button>
                    <button onClick={() => setEditingId(null)}>Cancel</button>
                  </>
                ) : (
                  <>
                    <button onClick={() => handleEditClick(record)}>Edit</button>
                    <button onClick={() => handleDelete(record.record_id)}>Delete</button>
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

export default MedicalRecords;
