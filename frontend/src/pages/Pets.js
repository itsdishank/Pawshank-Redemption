import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Pets = () => {
  const [pets, setPets] = useState([]);
  const [newPet, setNewPet] = useState({ name: '', species: '', breed: '', birth_date: '', owner_id: '' });
  const [editingPetId, setEditingPetId] = useState(null);
  const [editedPet, setEditedPet] = useState({});

  const fetchPets = () => {
    axios.get('http://localhost:5000/api/pets')
      .then(res => setPets(res.data))
      .catch(err => console.error(err));
  };

  useEffect(() => {
    fetchPets();
  }, []);

  const handleInputChange = (e) => {
    setNewPet({ ...newPet, [e.target.name]: e.target.value });
  };

  const handleAddPet = (e) => {
    e.preventDefault();
    axios.post('http://localhost:5000/api/pets', newPet)
      .then(() => {
        fetchPets();
        setNewPet({ name: '', species: '', breed: '', birth_date: '', owner_id: '' });
      })
      .catch(err => console.error(err));
  };

  const handleDelete = (id) => {
    if (window.confirm('Delete this pet?')) {
      axios.delete(`http://localhost:5000/api/pets/${id}`)
        .then(() => fetchPets())
        .catch(err => console.error(err));
    }
  };

  const handleEditClick = (pet) => {
    setEditingPetId(pet.pet_id);
    setEditedPet({ ...pet });
  };

  const handleEditChange = (e) => {
    setEditedPet({ ...editedPet, [e.target.name]: e.target.value });
  };

  const handleSaveEdit = () => {
    axios.put(`http://localhost:5000/api/pets/${editingPetId}`, editedPet)
      .then(() => {
        fetchPets();
        setEditingPetId(null);
        setEditedPet({});
      })
      .catch(err => console.error(err));
  };

  return (
    <div style={{ padding: '1rem' }}>
      <h2>Pets</h2>

      <form onSubmit={handleAddPet} style={{ marginBottom: '1.5rem' }}>
        <input name="name" placeholder="Name" value={newPet.name} onChange={handleInputChange} required />
        <input name="species" placeholder="Species" value={newPet.species} onChange={handleInputChange} required />
        <input name="breed" placeholder="Breed" value={newPet.breed} onChange={handleInputChange} required />
        <input name="birth_date" placeholder="Birth Date" value={newPet.birth_date} onChange={handleInputChange} required />
        <input name="owner_id" placeholder="Owner ID" value={newPet.owner_id} onChange={handleInputChange} required />
        <button type="submit">Add Pet</button>
      </form>

      <table border="1" cellPadding="8" style={{ width: '100%', backgroundColor: 'white' }}>
        <thead>
          <tr>
            <th>ID</th><th>Name</th><th>Species</th><th>Breed</th><th>Birth Date</th><th>Owner ID</th><th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {pets.map((pet) => (
            <tr key={pet.pet_id}>
              <td>{pet.pet_id}</td>
              <td>
                {editingPetId === pet.pet_id ? (
                  <input name="name" value={editedPet.name} onChange={handleEditChange} />
                ) : (
                  pet.name
                )}
              </td>
              <td>
                {editingPetId === pet.pet_id ? (
                  <input name="species" value={editedPet.species} onChange={handleEditChange} />
                ) : (
                  pet.species
                )}
              </td>
              <td>
                {editingPetId === pet.pet_id ? (
                  <input name="breed" value={editedPet.breed} onChange={handleEditChange} />
                ) : (
                  pet.breed
                )}
              </td>
              <td>
                {editingPetId === pet.pet_id ? (
                  <input name="birth_date" value={editedPet.birth_date} onChange={handleEditChange} />
                ) : (
                  pet.birth_date
                )}
              </td>
              <td>
                {editingPetId === pet.pet_id ? (
                  <input name="owner_id" value={editedPet.owner_id} onChange={handleEditChange} />
                ) : (
                  pet.owner_id
                )}
              </td>
              <td>
                {editingPetId === pet.pet_id ? (
                  <>
                    <button onClick={handleSaveEdit}>Save</button>
                    <button onClick={() => setEditingPetId(null)}>Cancel</button>
                  </>
                ) : (
                  <>
                    <button onClick={() => handleEditClick(pet)}>Edit</button>
                    <button onClick={() => handleDelete(pet.pet_id)}>Delete</button>
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

export default Pets;
