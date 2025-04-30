// backend/controllers/medicalRecordController.js
const db = require('../config/db');

// GET all medical records
exports.getAllRecords = async (req, res) => {
  try {
    const [records] = await db.query('SELECT * FROM PetMedicalRecord');
    res.json(records);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
};

// POST create medical record
exports.createRecord = async (req, res) => {
  try {
    const { pet_id, description, record_date, vet_name } = req.body;
    await db.query(
      'INSERT INTO PetMedicalRecord (pet_id, description, record_date, vet_name) VALUES (?, ?, ?, ?)',
      [pet_id, description, record_date, vet_name]
    );
    res.status(201).send('Medical record added');
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
};

// PUT update medical record
exports.updateRecord = async (req, res) => {
  try {
    const { id } = req.params;
    const { pet_id, description, record_date, vet_name } = req.body;
    await db.query(
      'UPDATE PetMedicalRecord SET pet_id=?, description=?, record_date=?, vet_name=? WHERE record_id=?',
      [pet_id, description, record_date, vet_name, id]
    );
    res.send('Medical record updated');
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
};

// DELETE medical record
exports.deleteRecord = async (req, res) => {
  try {
    const { id } = req.params;
    await db.query('DELETE FROM PetMedicalRecord WHERE record_id = ?', [id]);
    res.send('Medical record deleted');
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
};

exports.getMedicalHistoryByPet = async (req, res) => {
  const petId = req.params.petId;
  try {
    const [rows] = await db.query('CALL GetPetMedicalHistory(?)', [petId]);
    res.json(rows[0]); // because MySQL returns result in nested array
  } catch (error) {
    console.error('Error calling stored procedure:', error);
    res.status(500).send('Server error');
  }
};
