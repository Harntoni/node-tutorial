import Joi from "joi";

export const transferSchema = Joi.object({
sourceAccount: Joi.string().required(),
destinationAccount: Joi.string().required(),
amount: Joi.number().required()
});