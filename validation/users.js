const Joi = require("joi");
const { EMAIL_REGEXP } = require("./constants");

const registrationValidation = (data) => {
	const registrationSchema = Joi.object({
		name: Joi.string().required(),
		email: Joi.string().pattern(EMAIL_REGEXP).required(),
		password: Joi.string().min(4).required(),
	});
	return registrationSchema.validate(data);
};

const loginValidation = (data) => {
	const loginSchema = Joi.object({
		email: Joi.string().pattern(EMAIL_REGEXP).required(),
		password: Joi.string().min(4).required(),
	});
	return loginSchema.validate(data);
};

module.exports = {
	registrationValidation,
	loginValidation,
};
