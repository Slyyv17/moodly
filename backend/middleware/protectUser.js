// middlewares/protectUser.js
const jwt = require('jsonwebtoken');
const { ObjectId } = require('mongodb'); // Add this import
const { getDB } = require('../config/config');
const AppError = require('../error/appError');
const catchAsync = require('../error/catchAsync');

const protectUser = catchAsync(async (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return next(new AppError('You are not logged in', 401));
    }

    const token = authHeader.split(' ')[1];

    try {
        // verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET_USER);

        //  attach user to req
        const db = getDB();

        // Convert string ID to ObjectId if necessary
        let userId;
        try {
            userId = new ObjectId(decoded.id);
        } catch (error) {
            // If conversion fails, use the original ID (in case it's already an ObjectId)
            userId = decoded.id;
        }

        const user = await db.collection('users').findOne({ _id: userId });

        if (!user) {
            return next(new AppError('User no longer exists', 401));
        }

        req.user = user;
        next();
    } catch (error) {
        console.error('JWT verification error:', error);
        return next(new AppError('Invalid token', 401));
    }
});

module.exports = protectUser;