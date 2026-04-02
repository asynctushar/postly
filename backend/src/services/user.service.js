const User = require("../models/User");
const ErrorHandler = require("../utils/errorHandler");

// Create User
exports.createUser = async ({ username, email, password, image }) => {
    const existingUser = await User.findOne({ email });

    if (existingUser) {
        throw new ErrorHandler("User already exists", 400);
    }

    const user = await User.create({
        username,
        email,
        password,
        image,
    });

    return user;
};


// Login User
exports.loginUser = async ({ email, password }) => {
    const user = await User.findOne({ email }).select("+password");

    if (!user) {
        throw new ErrorHandler("Invalid email or password", 401);
    }

    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
        throw new ErrorHandler("Invalid email or password", 401);
    }

    return user;
};

// Upload Profile Image
exports.updateProfileImage = async (user, image) => {
    user.image = image;
    await user.save();
    return user;
};


// Save Refresh Token
exports.saveRefreshToken = async (userId, token) => {
    return await User.findByIdAndUpdate(userId, {
        refreshToken: token,
    });
};


// Find by Refresh Token
exports.findByRefreshToken = async (token) => {
    return await User.findOne({ refreshToken: token });
};


// Remove Refresh Token (Logout)
exports.removeRefreshToken = async (userId) => {
    return await User.findByIdAndUpdate(userId, {
        refreshToken: null,
    });
};


// Get User By ID
exports.getUserById = async (id) => {
    return await User.findById(id);
};