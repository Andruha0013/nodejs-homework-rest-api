const Joi = require("joi");

const contactValidation = (data, requireFlag) => {
	if (requireFlag === true) {
		const schema = Joi.object({
			name: Joi.string().min(2).max(255).required(),
			email: Joi.string().min(4).max(255).email().required(),
			phone: Joi.string()
				.min(3)
				.max(20)
				.required()
				.pattern(/^\+|\d[\s\d\-\(\)]*\d$/),
		});
		return schema.validate(data);
	}
	const schema = Joi.object({
		name: Joi.string().min(2).max(255),
		email: Joi.string().min(4).max(255).email(),
		phone: Joi.string()
			.min(3)
			.max(20)
			.pattern(/^\+|\d[\s\d\-\(\)]*\d$/),
	});
	return schema.validate(data);
};

module.exports = {
	contactValidation,
};
