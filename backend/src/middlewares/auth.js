const catchAsyncErrors = require("./catchAsyncErrors");



exports.isAuthenticatedUser = catchAsyncErrors(async (req, res, next) => {
    next();
});