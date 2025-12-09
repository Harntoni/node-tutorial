import joi from 'joi';

export const signupuserSchema = joi.object({
    id: joi.string().required(),
    firstName: joi.string().required(),
    lastName: joi.string().required(),
    email: joi.string().email().required(),
    password: joi.string().required(),
    role: joi.string().required(),
    createdAt: joi.string().required().isoDate(),
    accountType: joi.string().required()
});