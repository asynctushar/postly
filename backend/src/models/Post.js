const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        text: {
            type: String,
            required: true,
            trim: true,
        },
    },
    { timestamps: true }
);


const postSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        text: {
            type: String,
            trim: true,
        },

        image: {
            public_id: String,
            url: String
        },

        likes: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
            },
        ],

        comments: [commentSchema],
    },
    { timestamps: true }
);


// Ensure at least text OR image exists
postSchema.pre("validate", function (next) {
    if (!this.text && !this.image) {
        next(new Error("Post must contain text or image"));
    }
    next();
});


module.exports = mongoose.model("Post", postSchema);