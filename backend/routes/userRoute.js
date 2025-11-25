const Router = require('express');
const { selectFeeling, getAllUsers, sendRequest, acceptRequest, rejectRequest, getPendingRequests, profile, checkRequest, cancelRequest, getFriends } = require('../controllers/userController');
const protectUser = require('../middleware/protectUser');
const router = Router();

router.get('/profile', protectUser, profile);
router.post('/select-feeling', protectUser, selectFeeling);
router.get('/all', protectUser, getAllUsers);
router.post('/send-request/:targetId', protectUser, sendRequest);
router.get('/check-request/:targetId', protectUser, checkRequest);
router.delete('/request/:targetId', protectUser, cancelRequest);
router.post('/accept/:senderId', protectUser, acceptRequest);
router.post('/reject/:senderId', protectUser, rejectRequest);
router.get('/pending-requests', protectUser, getPendingRequests);
router.get('/friends', protectUser, getFriends);

module.exports = router;