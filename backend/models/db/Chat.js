const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema(
    {
        sender: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        receiver: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: false, // might be null if sent to a group or mood room
        },
        message: {
            type: String,
            required: true,
            trim: true,
        },
        emotion: {
            type: String,
            enum: ['anger', 'disgust', 'fear', 'joy', 'neutral', 'sadness', 'surprise', 'unknown'],
            default: 'neutral',
        },
        score: {
            type: Number,
            default: 0,
        },
        roomType: {
            type: String,
            enum: ['direct', 'happy_room', 'support_room', 'neutral_room'],
            default: 'direct',
        },
        seen: {
            type: Boolean,
            default: false,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model('Chat', chatSchema);