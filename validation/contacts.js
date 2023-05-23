const Joi = require("joi");
const { EMAIL_REGEXP, PHONE_REGEXP } = require("./constants");

const contactValidation = (data, requireFlag) => {
	if (requireFlag === true) {
		const schema = Joi.object({
			name: Joi.string().min(2).max(255).required(),
			email: Joi.string().min(4).max(255).pattern(EMAIL_REGEXP).required(),
			phone: Joi.string().min(3).max(20).required().pattern(PHONE_REGEXP),
			favorite: Joi.bool().required(),
		});
		return schema.validate(data);
	} else {
		const schema = Joi.object({
			name: Joi.string().min(2).max(255).optional(),
			email: Joi.string().min(4).max(255).pattern(EMAIL_REGEXP).optional(),
			phone: Joi.string().min(3).max(20).pattern(PHONE_REGEXP).optional(),
			favorite: Joi.bool(),
		}).min(1);
		return schema.validate(data);
	}
};

module.exports = contactValidation;
