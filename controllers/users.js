const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { User } = require("../models/user");
const { HttpError, ctrlWrapper } = require("../helpers");

//-----------------------------registration-------------------------------------------------------
const registration = async (req, res) => {
	//console.log("registration");
	const user = await User.findOne({ email: req.body.email });
	if (user) {
		throw HttpError(409, "such email is already exist");
	}

	const hashPassword = await bcrypt.hash(req.body.password, 10);
	console.log(hashPassword);

	const newUser = await User.create({ ...req.body, password: hashPassword });
	res.status(201).json({
		status: "success",
		code: 201,
		data: { name: newUser.name, email: newUser.email },
	});
};
//-----------------------------login-------------------------------------------------------
const login = async (req, res) => {
	//console.log("login");
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
	console.log(_id);
	await User.findByIdAndUpdate(_id, { token: "" });
	res.status(204).json();
};
//=======================================================================================

module.exports = {
	registration: ctrlWrapper(registration),
	login: ctrlWrapper(login),
	getCurrent: ctrlWrapper(current),
	logout: ctrlWrapper(logout),
};
