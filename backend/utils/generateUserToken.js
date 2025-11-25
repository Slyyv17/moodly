const jwt = require('jsonwebtoken');

const generateUserToken = (userId, role) => {
    return jwt.sign(
        { id: userId, role },
        process.env.JWT_SECRET_USER,
        { expiresIn: process.env.JWT_EXPIRATION_USER }
    );
};

module.exports = generateUserToken;