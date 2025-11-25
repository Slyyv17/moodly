const { ObjectId } = require('mongodb');
const { getDB } = require('../config/config');
const AppError = require('../error/appError');
const catchAsync = require('../error/catchAsync');

const profile = catchAsync(async (req, res, next) => {
    const db = getDB();
    const users = db.collection('users');

    const user = await users.findOne(
        { _id: new ObjectId(req.user._id) },
        { projection: { password: 0 } } // exclude password field
    );

    if (!user) {
        return next(new AppError('User not found.', 404));
    }

    res.status(200).json({
        status: 'success',
        data: { user }
    });
})

const selectFeeling = catchAsync(async (req, res, next) => {
    const db = getDB();
    const users = db.collection('users');
    const { feeling } = req.body;

    // Ensure request body has a feeling
    if (!feeling) {
        return next(new AppError('Please provide a feeling.', 400));
    }

    // Validate feeling value
    const validFeelings = ['happy', 'sad', 'content', 'angry', 'calm', 'neutral', 'excited', 'anxious', 'overwhelmed'];
    if (!validFeelings.includes(feeling)) {
        return next(new AppError('Invalid feeling provided.', 400));
    }

    if (!req.user || !req.user._id) {
        return next(new AppError('User not authenticated.', 401));
    }

    // 3. Update feeling
    const result = await users.findOneAndUpdate(
        { _id: new ObjectId(req.user._id) },
        { $set: { feeling } },
        { returnDocument: 'after', returnOriginal: false }
    );

    // Handle both driver response shapes
    const updatedUser = result.value || result;

    if (!updatedUser) {
        return next(new AppError('User not found.', 404));
    }

    // 4. Respond
    res.status(200).json({
        status: 'success',
        message: `Feeling updated to ${feeling}`,
        data: {
            user: updatedUser
        }
    });

});

const getAllUsers = catchAsync(async (req, res, next) => {
    const db = getDB();

    // Exclude logged-in user using _id
    const users = await db.collection('users')
        .find(
            { _id: { $ne: req.user._id } }, // not equal to current user ID
            { projection: { password: 0 } } // exclude password field
        )
        .toArray();

    if (!users || users.length === 0) {
        return next(new AppError("No other users found", 404));
    }

    res.status(200).json({
        status: 'success',
        results: users.length,
        data: { users },
    });
});

const sendRequest = catchAsync(async (req, res, next) => {
    const db = getDB();
    const friendRequests = db.collection('friendrequests');

    const senderId = new ObjectId(req.user._id);
    const receiverId = new ObjectId(req.params.targetId);

    if (senderId.equals(receiverId)) {
        return next(new AppError("You can't send a friend request to yourself.", 400));
    }

    // Check if a request already exists
    const existing = await friendRequests.findOne({
        senderId,
        receiverId,
        status: 'pending'
    });

    if (existing) {
        return next(new AppError('Friend request already sent.', 400));
    }

    // Insert new request
    await friendRequests.insertOne({
        senderId,
        receiverId,
        status: 'pending',
        createdAt: new Date()
    });

    res.status(200).json({
        status: 'success',
        message: 'Friend request sent successfully.'
    });
});

// GET /user/check-request/:targetId
const checkRequest = catchAsync(async (req, res, next) => {
    const db = getDB();
    const friendRequests = db.collection('friendrequests');

    const senderId = new ObjectId(req.user._id);
    const receiverId = new ObjectId(req.params.targetId);

    const request = await friendRequests.findOne({
        senderId,
        receiverId,
        status: 'pending'
    });

    res.status(200).json({
        requested: !!request
    });
});

const cancelRequest = catchAsync(async (req, res, next) => {
    const db = getDB();
    const friendRequests = db.collection("friendrequests");

    const senderId = new ObjectId(req.user._id);
    const receiverId = new ObjectId(req.params.targetId);

    const deleted = await friendRequests.deleteOne({
        senderId,
        receiverId,
        status: "pending",
    });

    if (!deleted.deletedCount) {
        return next(new AppError("No pending request found.", 400));
    }

    res.status(200).json({
        status: "success",
        message: "Friend request cancelled.",
    });
});

const acceptRequest = catchAsync(async (req, res, next) => {
    const db = getDB();
    const users = db.collection('users');
    const friendRequests = db.collection('friendrequests');

    const receiverId = new ObjectId(req.user._id);
    const senderId = new ObjectId(req.params.senderId);

    const request = await friendRequests.findOne({
        senderId,
        receiverId,
        status: 'pending'
    });

    if (!request) {
        return next(new AppError('Friend request not found.', 404));
    }

    // Update the request to accepted
    await friendRequests.updateOne(
        { _id: request._id },
        { $set: { status: 'accepted' } }
    );

    // Add each other as friends
    await users.updateOne({ _id: receiverId }, { $addToSet: { friends: senderId } });
    await users.updateOne({ _id: senderId }, { $addToSet: { friends: receiverId } });

    res.status(200).json({
        status: 'success',
        message: 'Friend request accepted.'
    });
});

const rejectRequest = catchAsync(async (req, res, next) => {
    const db = getDB();
    const friendRequests = db.collection('friendrequests');

    const receiverId = new ObjectId(req.user._id);
    const senderId = new ObjectId(req.params.senderId);

    const request = await friendRequests.findOne({
        senderId,
        receiverId,
        status: 'pending'
    });

    if (!request) {
        return next(new AppError('Friend request not found.', 404));
    }

    await friendRequests.updateOne(
        { _id: request._id },
        { $set: { status: 'rejected' } }
    );

    res.status(200).json({
        status: 'success',
        message: 'Friend request rejected.'
    });
});

const getPendingRequests = catchAsync(async (req, res, next) => {
    const db = getDB();
    const friendRequests = db.collection('friendrequests');
    const users = db.collection('users');
    const receiverId = new ObjectId(req.user._id);

    // Find all pending friend requests where the current user is the receiver
    const pending = await friendRequests
        .find({ receiverId, status: 'pending' })
        .toArray();

    // Optionally, fetch sender details for richer info (username, avatar)
    const senderIds = pending.map(req => req.senderId);
    const senders = await users
        .find({ _id: { $in: senderIds } })
        .project({ username: 1, avatar: 1, email: 1 })
        .toArray();

    // Merge sender info with each request
    const requests = pending.map(req => ({
        _id: req._id,
        status: req.status,
        createdAt: req.createdAt,
        sender: senders.find(s => s._id.equals(req.senderId))
    }));

    // if no pending requests
    if (requests.length === 0) {
        return res.status(200).json({
            status: 'success',
            message: 'No pending friend requests.',
            count: 0,
            data: []
        });
    }

    res.status(200).json({
        status: 'success',
        count: requests.length,
        data: requests
    });
});

const getFriends = catchAsync(async (req, res, next) => {
    const db = getDB();

    const users = db.collection('users');
    const user = await users.findOne(
        { _id: new ObjectId(req.user._id) },
        { projection: { friends: 1 } }
    );

    if (!user) {
        return next(new AppError('User not found.', 404));
    }

    const friendIds = user.friends || [];
    const friends = await users
        .find({ _id: { $in: friendIds } }, { projection: { password: 0 } })
        .toArray();

    res.status(200).json({
        status: 'success',
        results: friends.length,
        data: { friends },
    });
})

module.exports = {
    profile,
    selectFeeling,
    getAllUsers,
    sendRequest,
    checkRequest,
    cancelRequest,
    acceptRequest,
    rejectRequest,
    getPendingRequests,
    getFriends,
}