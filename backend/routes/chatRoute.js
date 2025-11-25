const Router = require('express');
const {
    analyzeMessageHandler,
    sendChatHandler,
    saveChatHandler,
    getChatHistoryHandler,
} = require('../controllers/chatController');
const protectUser = require('../middleware/protectUser');

const router = Router();

// Analyze emotion of a message without saving
router.post('/analyze', protectUser, analyzeMessageHandler);

// Send a chat (analyze + save + return)
router.post('/sendChat', protectUser, sendChatHandler);

// Save a chat directly (optional, mainly for testing)
router.post('/save', protectUser, saveChatHandler);

// Get chat history between two users
router.get('/history/:user1/:user2', protectUser, getChatHistoryHandler);

module.exports = router;