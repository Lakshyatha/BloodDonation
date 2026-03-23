const express = require('express');
const router = express.Router();
const donorController = require('../controllers/donorController');

// POST /api/donors -> Add donor
router.post('/', donorController.createDonor);

// GET /api/donors -> Get all donors
router.get('/', donorController.getAllDonors);

// GET /api/donors/blood/:group -> Filter by blood group
router.get('/blood/:group', donorController.getDonorsByBloodGroup);

// GET /api/donors/city/:city -> Filter by city
router.get('/city/:city', donorController.getDonorsByCity);

// PUT /api/donors/:id -> Update donor
router.put('/:id', donorController.updateDonor);

// DELETE /api/donors/:id -> Delete donor
router.delete('/:id', donorController.deleteDonor);

module.exports = router;
