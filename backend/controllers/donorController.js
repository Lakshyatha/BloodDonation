const Donor = require('../models/Donor');
const { Op } = require('sequelize');

// Create a new donor
exports.createDonor = async (req, res) => {
  try {
    const { name, blood_group, phone, city } = req.body;
    const newDonor = await Donor.create({ name, blood_group, phone, city });
    res.status(201).json(newDonor);
  } catch (error) {
    res.status(500).json({ error: 'Failed to register donor' });
  }
};

// Get all donors
exports.getAllDonors = async (req, res) => {
  try {
    const donors = await Donor.findAll();
    res.status(200).json(donors);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch donors' });
  }
};

// Get donors by blood group
exports.getDonorsByBloodGroup = async (req, res) => {
  try {
    const { group } = req.params;
    // Handle URL encoded plus sign
    const decodedGroup = decodeURIComponent(group);
    
    const donors = await Donor.findAll({
      where: {
        blood_group: decodedGroup
      }
    });
    res.status(200).json(donors);
  } catch (error) {
    res.status(500).json({ error: 'Failed to filter by blood group' });
  }
};

// Get donors by city
exports.getDonorsByCity = async (req, res) => {
  try {
    const { city } = req.params;
    const donors = await Donor.findAll({
      where: {
        city: {
          [Op.like]: `%${city}%` // Support partial match
        }
      }
    });
    res.status(200).json(donors);
  } catch (error) {
    res.status(500).json({ error: 'Failed to filter by city' });
  }
};

// Update a donor
exports.updateDonor = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, blood_group, phone, city } = req.body;
    
    const donor = await Donor.findByPk(id);
    if (!donor) {
      return res.status(404).json({ error: 'Donor not found' });
    }

    donor.name = name || donor.name;
    donor.blood_group = blood_group || donor.blood_group;
    donor.phone = phone || donor.phone;
    donor.city = city || donor.city;
    
    await donor.save();
    res.status(200).json(donor);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update donor' });
  }
};

// Delete a donor
exports.deleteDonor = async (req, res) => {
  try {
    const { id } = req.params;
    const donor = await Donor.findByPk(id);
    if (!donor) {
      return res.status(404).json({ error: 'Donor not found' });
    }

    await donor.destroy();
    res.status(200).json({ message: 'Donor deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete donor' });
  }
};
