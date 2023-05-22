const jwt = require("jsonwebtoken");
const { HttpError } = require("../helpers");
const { User } = require("../models/user");
const { SECRET_KEY } = process.env;

const authenticate = async (req, res, next) => {
	const { authorization = "" } = req.headers; //якщо authenticate - undefinde, то прсвоюємо пусту строку
	const [bearer, token] = authorization.split(" ");
	//console.log(`\n${authorization}`);
	//console.log(`\n${token}`);
	//console.log("\n");
	if (bearer !== "Bearer") {
		next(HttpError(401, "un autorise"));
	}
	try {
		const paload = jwt.verify(token, SECRET_KEY);
		//console.log(paload);
		const user = await User.findById(paload.id);
		if (!user || !user.token || user.token !== token) {
			next(HttpError(401, "un autorise"));
		}
		req.user = user;
		next();
	} catch (error) {
		next(HttpError(401, "un autorise"));
	}
};

module.exports = authenticate;
