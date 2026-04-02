const Joi = require("joi");

exports.createPostSchema = Joi.object({
    text: Joi.string().allow("").optional(),
});


exports.commentSchema = Joi.object({
    text: Joi.string().min(1).required(),
});