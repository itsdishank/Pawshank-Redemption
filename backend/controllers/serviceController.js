// backend/controllers/serviceController.js
const db = require('../config/db');

exports.getAllServices = async (req, res) => {
  try {
    const [services] = await db.query('SELECT * FROM Service');
    res.json(services);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
};

exports.createService = async (req, res) => {
  try {
    const { name, description, cost } = req.body;
    await db.query(
      'INSERT INTO Service (name, description, cost) VALUES (?, ?, ?)',
      [name, description, cost]
    );
    res.status(201).send('Service created');
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
};

exports.updateService = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, cost } = req.body;
    await db.query(
      'UPDATE Service SET name=?, description=?, cost=? WHERE service_id=?',
      [name, description, cost, id]
    );
    res.send('Service updated');
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
};

exports.deleteService = async (req, res) => {
  try {
    const { id } = req.params;
    await db.query('DELETE FROM Service WHERE service_id = ?', [id]);
    res.send('Service deleted');
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
};
