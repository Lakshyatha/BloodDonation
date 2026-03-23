const Donor = require('../models/Donor');
const { Op } = require('sequelize');

// Natural language search simulation
exports.naturalLanguageSearch = async (req, res) => {
  try {
    const { query } = req.body;
    if (!query) return res.status(400).json({ error: 'Query is required' });

    // Simple NLP simulation: Extract possible blood groups and city names
    const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
    
    let targetGroup = '';
    let targetCity = '';

    // Find blood group in query
    for (let bg of bloodGroups) {
      if (query.includes(bg)) {
        targetGroup = bg;
        break;
      }
    }

    // Attempt to extract city (simple heuristic: words after 'in')
    if (query.toLowerCase().includes(' in ')) {
      targetCity = query.toLowerCase().split(' in ')[1].split(' ')[0]; // just grab the word after 'in'
    }

    // Construct search conditions
    const conditions = {};
    if (targetGroup) conditions.blood_group = targetGroup;
    if (targetCity) conditions.city = { [Op.like]: `%${targetCity}%` };

    const donors = await Donor.findAll({ where: conditions });

    let message = `Found ${donors.length} donors matching your request.`;
    if (targetGroup && targetCity) {
       message = `Found ${donors.length} donors for blood group ${targetGroup} in ${targetCity}.`;
    }

    res.status(200).json({
      message,
      extractedFilters: { blood_group: targetGroup, city: targetCity },
      donors
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'AI processing failed' });
  }
};

// Chatbot query
exports.chatbotQuery = async (req, res) => {
  try {
    const { message } = req.body;
    const lowerMsg = message.toLowerCase();
    
    let reply = "I am a simple AI bot for the Blood Donation System. You can ask me to 'find donors', 'register', or 'generate alert'.";

    if (lowerMsg.includes('register') || lowerMsg.includes('be a donor')) {
      reply = "You can register as a donor by navigating to our 'Register Donor' page from the top menu!";
    } else if (lowerMsg.includes('find') || lowerMsg.includes('search')) {
      reply = "You can search for donors by city or blood group via the 'View Donors' page, or use our Natural Language Search.";
    } else if (lowerMsg.includes('hello') || lowerMsg.includes('hi')) {
      reply = "Hello! How can I assist you with your blood donation needs today?";
    } else if (lowerMsg.includes('emergency')) {
      reply = "For emergencies, please use our Emergency Alert Generator to inform donors nearby.";
    }

    res.status(200).json({ reply });
  } catch (error) {
    res.status(500).json({ error: 'Chatbot error' });
  }
};

// Generate emergency alert
exports.generateAlert = async (req, res) => {
  try {
    const { patientName, bloodGroup, hospitalName, city, contact } = req.body;
    
    // Generates a mock SMS/WhatsApp alert template
    const alertMessage = `🚨 URGENT EMERGENCY 🚨\n\nPatient: ${patientName}\nRequires: ${bloodGroup} Blood\nHospital: ${hospitalName}\nCity: ${city}\nContact: ${contact}\n\nPlease help save a life! Forward this message.`;

    res.status(200).json({ alert: alertMessage });
  } catch (error) {
    res.status(500).json({ error: 'Failed to generate alert' });
  }
};
