const { boolean } = require("joi");
const { Schema, model } = require("mongoose");

const userSchema = new Schema(
	{
		name: {
			type: String,
			required: [true, "What`s your name?"],
		},
		password: {
			type: String,
			required: [true, "Set password for user"],
		},
		email: {
			type: String,
			required: [true, "Email is required"],
			unique: true,
		},
		subscription: {
			type: String,
			enum: ["starter", "pro", "business"],
			default: "starter",
		},
		token: String,
		avatarURL: {
			type: String,
		},
		verify: {
			type: Boolean,
			default: false,
		},
		verificationToken: {
			type: String,
			required: [true, "Verify token is required"],
		},
	},
	{
		versionKey: false,
		timestamps: true,
	}
);
//----------------------------------------------------------------------

const User = model("user", userSchema);

module.exports = { User };
