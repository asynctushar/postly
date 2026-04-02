// Helper to send tokens
const sendTokens = async (user, res) => {
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    await userService.saveRefreshToken(user._id, refreshToken);

    res.status(200).json({
        success: true,
        accessToken,
        refreshToken,
        user,
    });
};

module.exports = sendTokens;