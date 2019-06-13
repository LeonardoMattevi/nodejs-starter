const Joi = require("joi"); // to validate objects schema
exports.validateUser = function (user) {
    const userValidator = {
        firstName: Joi.string().min(3).required(),
        lastName: Joi.string().min(3).required(),
        email: Joi.string().email({ minDomainAtoms: 2 }).required(),
        isActive: Joi.bool()
    };
    return Joi.validate(user, userValidator);
}