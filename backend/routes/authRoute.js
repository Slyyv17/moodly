const Router = require('express');
const { registerUser, loginUser, logoutUser } = require('../controllers/authController');
const router = Router();

router.post('/user/register', registerUser);
router.post('/user/login', loginUser);
router.post('/user/logout', logoutUser);

module.exports = router;