const { Schema, model } = require("mongoose");
const { EMAIL_REGEXP, PHONE_REGEXP } = require("../validation/constants");

const contactSchema = new Schema({
	name: {
		type: String,
		required: [true, "Set name for contact"],
	},
	email: {
		type: String,
		match: EMAIL_REGEXP,
	},
	phone: {
		type: String,
		match: PHONE_REGEXP,
	},
	favorite: {
		type: Boolean,
		default: false,
	},
	owner: {
		type: Schema.Types.ObjectId,
		ref: "user",
		required: true,
	},
});

const Contact = model("contact", contactSchema);

module.exports = { Contact };
