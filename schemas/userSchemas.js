import Joi from "joi";
import { emailRegex } from "../constants/constants.js";

export const createUserSchema = Joi.object({
  password: Joi.string().min(6).required(),
  email: Joi.string().regex(emailRegex).required(),
  subscription: Joi.string().valid("starter", "pro", "business").optional(),
  token: Joi.string().optional(),
});

export const loginUserSchema = Joi.object({
  password: Joi.string().min(6).required(),
  email: Joi.string().regex(emailRegex).required(),
});
