const { isValidObjectId } = require("mongoose");

const isValidID = (req, res, next) => {
	const id = req.params.contactId;
	if (!isValidObjectId(id)) {
		res.json({
			status: "faild",
			code: 400,
			message: "id is not valid",
		});
		return;
	}
	next();
};

module.exports = isValidID;
