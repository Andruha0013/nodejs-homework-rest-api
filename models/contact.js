const { Schema, model } = require("mongoose");

const contactSchema = new Schema({
	name: {
		type: String,
		required: [true, "Set name for contact"],
	},
	email: {
		type: String,
		match: /(^[\w\.]+@[a-zA-Z_]+?\.[a-zA-Z]{2,6})$/,
	},
	phone: {
		type: String,
		match: /^\+|\d[\s\d\-\(\)]*\d$/,
	},
	favorite: {
		type: Boolean,
		default: false,
	},
});

const Contact = model("contact", contactSchema);

module.exports = { Contact };
