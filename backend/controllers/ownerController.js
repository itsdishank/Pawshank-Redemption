const db = require('../config/db');

exports.getAllOwners = async (req, res) => {
  try {
    const [owners] = await db.query('SELECT * FROM Owner');
    res.json(owners);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};

exports.createOwner = async (req, res) => {
  const { first_name, last_name, phone, email } = req.body;
  try {
    await db.query(
      'INSERT INTO Owner (first_name, last_name, phone, email) VALUES (?, ?, ?, ?)',
      [first_name, last_name, phone, email]
    );
    res.status(201).send('Owner created');
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};

exports.updateOwner = async (req, res) => {
  const { first_name, last_name, phone, email } = req.body;
  const { id } = req.params;
  try {
    await db.query(
      'UPDATE Owner SET first_name=?, last_name=?, phone=?, email=? WHERE owner_id=?',
      [first_name, last_name, phone, email, id]
    );
    res.send('Owner updated');
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};

exports.deleteOwner = async (req, res) => {
  const { id } = req.params;
  try {
    await db.query('DELETE FROM Owner WHERE owner_id = ?', [id]);
    res.send('Owner deleted');
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};
