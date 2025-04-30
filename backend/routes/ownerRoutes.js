const express = require('express');
const router = express.Router();
const ownerController = require('../controllers/ownerController');

router.get('/', ownerController.getAllOwners);
router.post('/', ownerController.createOwner);
router.put('/:id', ownerController.updateOwner); // <== line 8
router.delete('/:id', ownerController.deleteOwner);

module.exports = router;
