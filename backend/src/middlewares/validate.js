const ErrorHandler = require("../utils/errorHandler");

const validate = (schema) => (req, res, next) => {
    const { error } = schema.validate(req.body);

    if (error) {
        const message = error.details[0].message;
        return next(new ErrorHandler(message, 400));
    }

    next();
};

module.exports = validate;