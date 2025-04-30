// backend/controllers/petController.js
const db = require('../config/db');

// GET all Pets
exports.getAllPets = async (req, res) => {
  try {
    const [pets] = await db.query('SELECT * FROM Pet');
    res.json(pets);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
};

// POST Create new Pet
exports.createPet = async (req, res) => {
  try {
    const { name, species, breed, birth_date, owner_id } = req.body;
    await db.query(
      'INSERT INTO Pet (name, species, breed, birth_date, owner_id) VALUES (?, ?, ?, ?, ?)',
      [name, species, breed, birth_date, owner_id]
    );
    res.status(201).send('Pet created successfully');
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
};

// PUT Update a Pet
exports.updatePet = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, species, breed, birth_date, owner_id } = req.body;
    await db.query(
      'UPDATE Pet SET name=?, species=?, breed=?, birth_date=?, owner_id=? WHERE pet_id=?',
      [name, species, breed, birth_date, owner_id, id]
    );
    res.send('Pet updated successfully');
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
};

// DELETE a Pet
exports.deletePet = async (req, res) => {
  try {
    const { id } = req.params;
    await db.query('DELETE FROM Pet WHERE pet_id = ?', [id]);
    res.send('Pet deleted successfully');
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
};
