// const Joi = require("joi");

// exports.signupSchema = Joi.object({
//   fullName: Joi.string().min(3).required(),
//   email: Joi.string().email().required(),
//   password: Joi.string().min(8).required(),
// });

// exports.loginSchema = Joi.object({
//   email: Joi.string().email().required(),
//   password: Joi.string().required(),
// });



const Joi = require("joi");

const signupSchema = Joi.object({
  fullName: Joi.string().min(3).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
});

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
});

module.exports = { signupSchema, loginSchema };