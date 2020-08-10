const Joi = require('joi');

exports.validateCreateUser = function (user) {
  const userValidator = {
    firstName: Joi.string().min(3).required(),
    lastName: Joi.string().min(3).required(),
    email: Joi.string().email({ minDomainAtoms: 2 }).required(),
    isActive: Joi.bool(),
  };

  return Joi.validate(user, userValidator);
};
exports.validateEditUser = function (user) {
  const userValidator = {
    _id: Joi.string().length(24).required(),
    firstName: Joi.string().min(3).required(),
    lastName: Joi.string().min(3).required(),
    email: Joi.string().email({ minDomainAtoms: 2 }).required(),
    isActive: Joi.bool(),
  };

  return Joi.validate(user, userValidator);
};
