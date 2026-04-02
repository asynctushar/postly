const express = require("express");
const { isAuthenticatedUser } = require("../middlewares/auth");
const validate = require("../middlewares/validate");
const upload = require("../middlewares/multer");

const {
    registerSchema,
    loginSchema,
} = require("../validators/user.validator");

const userController = require("../controllers/user.controller");

const router = express.Router();


// Auth
router.post("/register", validate(registerSchema), userController.registerUser);
router.post("/login", validate(loginSchema), userController.loginUser);
router.post("/refresh-token", userController.refreshToken);
router.post("/logout", isAuthenticatedUser, userController.logoutUser);


// User
router.get("/me", isAuthenticatedUser, userController.getMe);
router.put(
    "/profile/image",
    isAuthenticatedUser,
    upload.single("avatar"),
    userController.updateProfileImage
);

module.exports = router;