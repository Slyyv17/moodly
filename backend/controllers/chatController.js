const { ObjectId } = require('mongodb');
const { getDB } = require('../config/config');

// 1. ANALYZE MESSAGE (internal)
async function analyzeMessage(message) {
    try {
        const response = await fetch(
            "https://api-inference.huggingface.co/models/j-hartmann/emotion-english-distilroberta-base",
            {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${process.env.HF_TOKEN}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ inputs: message }),
            }
        );

        const result = await response.json();

        const top = result?.[0]?.reduce((a, b) => (a.score > b.score ? a : b), {
            label: "neutral",
            score: 0,
        });

        return { emotion: top.label, score: top.score };
    } catch (err) {
        console.error("Sentiment error:", err);
        return { emotion: "neutral", score: 0 };
    }
}

// 2. ANALYZE MESSAGE HANDLER (route)
async function analyzeMessageHandler(req, res, next) {
    try {
        const { message } = req.body;

        if (!message) {
            return res.status(400).json({ error: "Message text required." });
        }

        const { emotion, score } = await analyzeMessage(message);

        res.status(200).json({
            message,
            emotion,
            score,
        });
    } catch (err) {
        next(err);
    }
}

async function sendChatHandler(req, res, next) {
    try {
        const sender = req.user.id;
        const { receiver, message } = req.body;

        if (!receiver || !message) {
            return res.status(400).json({ error: "receiver and message required." });
        }

        const { emotion, score } = await analyzeMessage(message);

        const saved = await saveChat({
            sender,
            receiver,
            message,
            emotion,
            score,
        });

        res.status(201).json(saved);
    } catch (err) {
        next(err);
    }
}

// 3. SAVE CHAT
async function saveChat({ sender, receiver, message, emotion, score }) {
    const db = getDB();

    const doc = {
        sender: new ObjectId(sender),
        receiver: new ObjectId(receiver),
        message,
        emotion,
        score,
        seen: false,
        roomType: "direct",
        createdAt: new Date(),
    };

    await db.collection("chats").insertOne(doc);
    return doc;
}

async function saveChatHandler(req, res, next) {
    try {
        const sender = req.user.id;
        const { receiver, message } = req.body;

        if (!sender || !receiver || !message) {
            return res.status(400).json({ error: "sender, receiver and message required." });
        }

        const { emotion, score } = await analyzeMessage(message);

        const chat = await saveChat({
            sender,
            receiver,
            message,
            emotion,
            score,
        });

        res.status(201).json(chat);
    } catch (err) {
        next(err);
    }
}

// 5. GET CHAT HISTORY (internal)
async function getChatHistory(user1, user2) {
    const db = getDB();

    return await db
        .collection("chats")
        .find({
            $or: [
                { sender: new ObjectId(user1), receiver: new ObjectId(user2) },
                { sender: new ObjectId(user2), receiver: new ObjectId(user1) },
            ],
        })
        .sort({ createdAt: 1 })
        .toArray();
}

async function getChatHistoryHandler(req, res, next) {
    try {
        const { user1, user2 } = req.params;

        if (!user1 || !user2) {
            return res.status(400).json({ error: "Both user1 and user2 required." });
        }

        const chats = await getChatHistory(user1, user2);

        res.status(200).json({
            count: chats.length,
            chats,
        });
    } catch (err) {
        next(err);
    }
}

// EXPORT EVERYTHING
module.exports = {
    analyzeMessage,
    analyzeMessageHandler,
    sendChatHandler,
    saveChat,
    saveChatHandler,
    getChatHistory,
    getChatHistoryHandler,
};