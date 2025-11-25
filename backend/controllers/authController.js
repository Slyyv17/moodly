const AppError = require('../error/appError');
const catchAsync = require('../error/catchAsync');
const { getDB } = require('../config/config');
const bcrypt = require('bcrypt');
const generateUserToken = require('../utils/generateUserToken');

const registerUser = catchAsync(async (req, res, next) => {
    const db = getDB();

    const { username, email, password } = req.body;
    if (!username || !email || !password) {
        return next(new AppError(404, "Fill all required fields"));
    }

    const existingUser = await db.collection('users').findOne({ email });
    if (existingUser) {
        return next(new AppError('User already exists', 400));
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const userData = {
        username,
        email,
        password: hashedPassword,
        createdAt: new Date(),
    };

    const result = await db.collection('users').insertOne(userData);
    const insertedUser = await db.collection('users').findOne({ _id: result.insertedId });

    res.status(201).json({
        status: 'success',
        data: {
            user: {
                _id: insertedUser._id,
                fullname: insertedUser.username,
                email: insertedUser.email,
            },
        },
    });
});

const loginUser = catchAsync(async (req, res, next) => {
    const db = getDB();
    const { email, password } = req.body;

    if (!email || !password) {
        return next(new AppError(404, "Fill all required fields"));
    }

    const existingUser = await db.collection('users').findOne({ email });
    if (!existingUser) {
        return next(new AppError('Invalid email or password', 401));
    }

    const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);
    if (!isPasswordCorrect) {
        return next(new AppError('Invalid email or password', 401));
    }

    // Optional: Extra safety
    delete existingUser.password;

    // Generate token
    const token = generateUserToken(existingUser._id, existingUser.role);

    res.status(200).json({
        status: 'success',
        data: {
            user: {
                _id: existingUser._id,
                username: existingUser.username,
                email: existingUser.email,
            },
            token,
        },
    });
});

const logoutUser = catchAsync(async (req, res, next) => {

    res.status(200).json({
        status: 'success',
        message: 'Logged out successfully',
    });
});

module.exports = {
    registerUser,
    loginUser,
    logoutUser,
}