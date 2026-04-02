const jwt = require("jsonwebtoken");
const catchAsyncErrors = require("./catchAsyncErrors");
const ErrorHandler = require("../utils/errorHandler");
const User = require("../models/User");

exports.isAuthenticatedUser = catchAsyncErrors(async (req, res, next) => {
    let token;

    // 1. Get token from header
    if (req.headers.authorization?.startsWith("Bearer")) {
        token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
        return next(new ErrorHandler("Please login to access this resource", 401));
    }

    // 2. Verify token
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    // 3. Get user 
    const user = await User.findById(decoded.id);

    if (!user) {
        return next(new ErrorHandler("User not found", 404));
    }

    // 4. Attach user
    req.user = user;

    next();
});