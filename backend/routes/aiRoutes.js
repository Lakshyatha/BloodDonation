const express = require('express');
const router = express.Router();
const aiController = require('../controllers/aiController');

// POST /api/ai/search -> Natural language search
router.post('/search', aiController.naturalLanguageSearch);

// POST /api/ai/chat -> Chatbot interactions
router.post('/chat', aiController.chatbotQuery);

// POST /api/ai/alert -> Emergency alert generator
router.post('/alert', aiController.generateAlert);

module.exports = router;
