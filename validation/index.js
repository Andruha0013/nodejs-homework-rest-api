const contactValidation = require("./contacts");
const isValidID = require("./validID");
const { registrationValidation, loginValidation } = require("./users");
const { registrationSchema, loginSchema } = require("./usersJoiSchema");

module.exports = {
	contactValidation,
	isValidID,
	registrationValidation,
	loginValidation,
	registrationSchema,
	loginSchema,
};
