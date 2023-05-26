const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const gravatar = require("gravatar");
const path = require("path");
const fs = require("fs/promises");
const Jimp = require("jimp");

const { User } = require("../models/user");
const { HttpError, ctrlWrapper } = require("../helpers");
const { error } = require("console");

const avatarDir = path.join(__dirname, "../", "public", "avatars");

//-----------------------------registration-------------------------------------------------------
const registration = async (req, res) => {
	const user = await User.findOne({ email: req.body.email });
	if (user) {
		throw HttpError(409, "such email is already exist");
	}

	const hashPassword = await bcrypt.hash(req.body.password, 10);
	//console.log(hashPassword);
	const avatarURL = gravatar.url(req.body.email);

	const newUser = await User.create({
		...req.body,
		password: hashPassword,
		avatarURL,
	});
	res.status(201).json({
		status: "success",
		code: 201,
		data: { name: newUser.name, email: newUser.email },
	});
};
//-----------------------------login-------------------------------------------------------
const login = async (req, res) => {
	const user = await User.findOne({ email: req.body.email });
	if (!user) {
		throw HttpError(401, "Email or password ivalid");
	}
	const passwordCompare = bcrypt.compare(req.body.password, user.password);
	if (!passwordCompare) {
		throw HttpError(401, "Email or password ivalid");
	}

	const { SECRET_KEY } = process.env;
	const payload = { id: user._id };

	const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "23h" });
	await User.findByIdAndUpdate(user._id, { token });
	res.status(200).json({
		status: "success",
		code: 200,
		data: token,
	});
};
//------------------------------current-----------------------------------------------------
const current = async (req, res) => {
	const { name, email, subscription } = req.user;
	res.status(200).json({
		status: "success",
		code: 200,
		data: {
			name: name,
			email: email,
			subscription: subscription,
		},
	});
};
//------------------------------logout-----------------------------------------------------
const logout = async (req, res) => {
	const { _id } = req.user;

	await User.findByIdAndUpdate(_id, { token: "" });
	res.status(204).json();
};
//----------------------------------update-avatar------------------------------------------
const updateAvatar = async (req, res) => {
	const { _id } = req.user;
	const { path: tempUpload, originalname } = req.file;
	const fileName = `${_id}_${originalname}`;
	const resultUpload = path.join(avatarDir, fileName);
	console.log(tempUpload);
	Jimp.read(tempUpload)
		.then((avatar) => {
			return avatar
				.resize(250, 250) // resize
				.write(resultUpload); // save
		})
		.catch((err) => {
			console.error(err);
		});

	await fs.unlink(tempUpload);

	const avatarURL = path.join("avatars", fileName);

	await User.findByIdAndUpdate(_id, { avatarURL });

	res.status(200).json({
		status: "success",
		code: 200,
		data: { avatarURL: avatarURL },
	});
};
//=======================================================================================

module.exports = {
	registration: ctrlWrapper(registration),
	login: ctrlWrapper(login),
	getCurrent: ctrlWrapper(current),
	logout: ctrlWrapper(logout),
	updateAvatar: ctrlWrapper(updateAvatar),
};
