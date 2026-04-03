const Post = require("../models/Post");
const ErrorHandler = require("../utils/errorHandler");


// Create Post
exports.createPost = async ({ userId, text, image }) => {
    if (!text && !image) {
        throw new ErrorHandler("Post must contain text or image", 400);
    }

    const post = await Post.create({
        user: userId,
        text,
        image,
    });

    return post;
};


// Get Feed (Pagination)
exports.getFeed = async ({ page = 1, limit = 10 }) => {
    const skip = (page - 1) * limit;

    const posts = await Post.find()
        .populate("user", "username image")
        .populate("comments.user", "username image")
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit);

    const total = await Post.countDocuments();

    return {
        posts,
        total,
        page,
        pages: Math.ceil(total / limit),
    };
};


// Toggle Like
exports.toggleLike = async (postId, userId) => {
    const post = await Post.findById(postId);

    if (!post) {
        throw new ErrorHandler("Post not found", 404);
    }

    const isLiked = post.likes.includes(userId);

    if (isLiked) {
        post.likes.pull(userId);
    } else {
        post.likes.push(userId);
    }

    await post.save();

    return {
        liked: !isLiked,
        likesCount: post.likes.length,
    };
};


// Add Comment
exports.addComment = async (postId, userId, text) => {
    const post = await Post.findById(postId);

    if (!post) {
        throw new ErrorHandler("Post not found", 404);
    }

    const comment = {
        user: userId,
        text,
    };

    post.comments.push(comment);

    await post.save();

    return {
        commentsCount: post.comments.length,
        comment,
    };
};