const express = require("express");
const { isAuthenticatedUser } = require("../middlewares/auth");
const validate = require("../middlewares/validate");
const upload = require("../middlewares/multer");

const {
    createPostSchema,
    commentSchema,
} = require("../validators/post.validator");

const postController = require("../controllers/post.controller");

const router = express.Router();


// Create Post
router.post(
    "/",
    isAuthenticatedUser,
    upload.single("image"),
    validate(createPostSchema),
    postController.createPost
);


// Feed (pagination)
router.get("/", isAuthenticatedUser, postController.getFeed);


// Like / Unlike
router.put("/:id/like", isAuthenticatedUser, postController.toggleLike);


// Comment
router.post(
    "/:id/comment",
    isAuthenticatedUser,
    validate(commentSchema),
    postController.addComment
);


module.exports = router;