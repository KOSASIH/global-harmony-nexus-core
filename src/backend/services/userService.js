// services/userService.js
const User = require('../models/User');

exports.getUserById = async (userId) => {
    return await User.findById(userId).select('-password');
};
