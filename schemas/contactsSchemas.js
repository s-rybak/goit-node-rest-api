import Joi from "joi";
import {emailRegex} from "../constants/constants.js";

export const queryContactSchema = Joi.object({
    limit: Joi.number().integer().min(0).max(50).optional(),
    page: Joi.number().integer().min(1).optional(),
    favorite: Joi.boolean().optional(),
});


export const createContactSchema = Joi.object({
    name: Joi.string().min(1).max(255).required(),
    email: Joi.string().regex(emailRegex).required(),
    phone: Joi.string()
        .pattern(/^[0-9]{10,15}$/)
        .required()
        .messages({
            "string.pattern.base": "Phone number must be between 10 and 15 digits.",
        })
});

export const updateContactSchema = Joi.object({
    name: Joi.string().min(1).max(255).optional(),
    email: Joi.string().regex(emailRegex).optional(),
    phone: Joi.string()
        .pattern(/^[0-9]{10,15}$/)
        .optional()
        .messages({
            "string.pattern.base": "Phone number must be between 10 and 15 digits.",
        })
})
    .or("name", "email", "phone")
    .messages({
        "object.missing": "Body must have at least one field",
    });

export const updateContactFavoritesSchema = Joi.object({
    favorite: Joi.boolean().required(),
});
