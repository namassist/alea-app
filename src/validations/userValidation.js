import Joi from "joi";

const createUserValidation = Joi.object({
  username: Joi.string().min(5).max(100).required(),
  email: Joi.string().email().max(100).required(),
  password: Joi.string().min(8).max(100).required(),
});

export { createUserValidation };
