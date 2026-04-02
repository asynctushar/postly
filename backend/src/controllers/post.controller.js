const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const postService = require("../services/post.service");
const { uploadImage } = require("../services/cloudinary");


// Create Post
exports.createPost = catchAsyncErrors(async (req, res, next) => {
    const { text } = req.body;

    let imageData = null;

    if (req.file) {
        imageData = await uploadImage(req.file, "/postly/posts");
    }

    const post = await postService.createPost({
        userId: req.user._id,
        text,
        image: imageData,
    });

    res.status(201).json({
        success: true,
        post,
    });
});


// Get Feed
exports.getFeed = catchAsyncErrors(async (req, res, next) => {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;

    const data = await postService.getFeed({ page, limit });

    res.status(200).json({
        success: true,
        ...data,
    });
});


// Like / Unlike
exports.toggleLike = catchAsyncErrors(async (req, res, next) => {
    const result = await postService.toggleLike(
        req.params.id,
        req.user._id
    );

    res.status(200).json({
        success: true,
        ...result,
    });
});


// Add Comment
exports.addComment = catchAsyncErrors(async (req, res, next) => {
    const { text } = req.body;

    const result = await postService.addComment(
        req.params.id,
        req.user._id,
        text
    );

    res.status(200).json({
        success: true,
        ...result,
    });
});