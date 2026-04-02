const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const ErrorHandler = require("../utils/errorHandler");
const jwt = require("jsonwebtoken");

const userService = require("../services/user.service");
const { uploadImage, deleteFile } = require("../services/cloud.service.js");
const sendTokens = require("../utils/sendTokens");


// Register
exports.registerUser = catchAsyncErrors(async (req, res, next) => {
    const { username, email, password } = req.body;

    const user = await userService.createUser({
        username,
        email,
        password,
    });

    await sendTokens(user, res);
});


// Login
exports.loginUser = catchAsyncErrors(async (req, res, next) => {
    const { email, password } = req.body;

    const user = await userService.loginUser({ email, password });

    await sendTokens(user, res);
});

// Upload Profile Image
exports.updateProfileImage = catchAsyncErrors(async (req, res, next) => {
    if (!req.file) {
        return next(new ErrorHandler("Please upload an image", 400));
    }

    const user = await userService.getUserById(req.user._id);

    if (user.image?.public_id) {
        await deleteFile(user.image.public_id);
    }

    const image = await uploadImage(req.file, "/postly/users");

    await userService.updateProfileImage(user, image);

    res.status(200).json({
        success: true,
        message: "Profile image updated",
        image,
    });
});


// Refresh Token
exports.refreshToken = catchAsyncErrors(async (req, res, next) => {
    const { refreshToken } = req.body;

    if (!refreshToken) {
        return next(new ErrorHandler("Refresh token required", 400));
    }

    // verify token
    let decoded;
    try {
        decoded = jwt.verify(
            refreshToken,
            process.env.REFRESH_TOKEN_SECRET
        );
    } catch (err) {
        return next(new ErrorHandler("Invalid refresh token", 401));
    }

    // find user
    const user = await userService.findByRefreshToken(refreshToken);

    if (!user) {
        return next(new ErrorHandler("Invalid refresh token", 401));
    }

    // generate new access token
    const newAccessToken = user.generateAccessToken();

    res.status(200).json({
        success: true,
        accessToken: newAccessToken,
    });
});


// Logout
exports.logoutUser = catchAsyncErrors(async (req, res, next) => {
    await userService.removeRefreshToken(req.user._id);

    res.status(200).json({
        success: true,
        message: "Logged out successfully",
    });
});


// Get Me
exports.getMe = catchAsyncErrors(async (req, res, next) => {
    const user = await userService.getUserById(req.user._id);

    res.status(200).json({
        success: true,
        user,
    });
});