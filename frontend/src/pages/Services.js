import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Services = () => {
  const [services, setServices] = useState([]);
  const [newService, setNewService] = useState({ name: '', description: '', cost: '' });
  const [editingId, setEditingId] = useState(null);
  const [editedService, setEditedService] = useState({});

  const fetchServices = () => {
    axios.get('http://localhost:5000/api/services')
      .then(res => setServices(res.data))
      .catch(err => console.error(err));
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const handleInputChange = (e) => {
    setNewService({ ...newService, [e.target.name]: e.target.value });
  };

  const handleAddService = (e) => {
    e.preventDefault();
    axios.post('http://localhost:5000/api/services', newService)
      .then(() => {
        fetchServices();
        setNewService({ name: '', description: '', cost: '' });
      })
      .catch(err => console.error(err));
  };

  const handleDelete = (id) => {
    if (window.confirm('Delete this service?')) {
      axios.delete(`http://localhost:5000/api/services/${id}`)
        .then(() => fetchServices())
        .catch(err => console.error(err));
    }
  };

  const handleEditClick = (service) => {
    setEditingId(service.service_id);
    setEditedService({ ...service });
  };

  const handleEditChange = (e) => {
    setEditedService({ ...editedService, [e.target.name]: e.target.value });
  };

  const handleSaveEdit = () => {
    axios.put(`http://localhost:5000/api/services/${editingId}`, editedService)
      .then(() => {
        fetchServices();
        setEditingId(null);
        setEditedService({});
      })
      .catch(err => console.error(err));
  };

  return (
    <div style={{ padding: '1rem' }}>
      <h2>Services</h2>

      <form onSubmit={handleAddService} style={{ marginBottom: '1.5rem' }}>
        <input name="name" placeholder="Service Name" value={newService.name} onChange={handleInputChange} required />
        <input name="description" placeholder="Description" value={newService.description} onChange={handleInputChange} required />
        <input name="cost" placeholder="Cost" value={newService.price} onChange={handleInputChange} required />
        <button type="submit">Add Service</button>
      </form>

      <table border="1" cellPadding="8" style={{ width: '100%', backgroundColor: 'white' }}>
        <thead>
          <tr>
            <th>ID</th><th>Name</th><th>Description</th><th>Cost</th><th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {services.map((service) => (
            <tr key={service.service_id}>
              <td>{service.service_id}</td>
              <td>
                {editingId === service.service_id ? (
                  <input name="name" value={editedService.name} onChange={handleEditChange} />
                ) : (
                  service.name
                )}
              </td>
              <td>
                {editingId === service.service_id ? (
                  <input name="description" value={editedService.description} onChange={handleEditChange} />
                ) : (
                  service.description
                )}
              </td>
              <td>
              {editingId === service.service_id ? (
                <input name="cost" value={editedService.price} onChange={handleEditChange} />
                ) : (
                service.price !== undefined && service.price !== null ? `$${service.price}` : 'N/A'
                )}
              </td>
              <td>
                {editingId === service.service_id ? (
                  <>
                    <button onClick={handleSaveEdit}>Save</button>
                    <button onClick={() => setEditingId(null)}>Cancel</button>
                  </>
                ) : (
                  <>
                    <button onClick={() => handleEditClick(service)}>Edit</button>
                    <button onClick={() => handleDelete(service.service_id)}>Delete</button>
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

export default Services;
