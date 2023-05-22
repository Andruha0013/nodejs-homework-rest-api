const Joi = require("joi");
const { EMAIL_REGEXP } = require("./constants");

const registrationSchema = Joi.object({
	name: Joi.string().required(),
	email: Joi.string().pattern(EMAIL_REGEXP).required(),
	password: Joi.string().min(4).required(),
	subscription: Joi.string()
		.valid("starter", "pro", "business")
		.default("starter")
		.required(),
	token: Joi.string().required(),
});

const loginSchema = Joi.object({
	email: Joi.string().pattern(EMAIL_REGEXP).required(),
	password: Joi.string().min(4).required(),
});

module.exports = {
	registrationSchema,
	loginSchema,
};
