const { Contact } = require("../models/contact");
const { contactValidation } = require("../validation");

const listContacts = async (req, res, next) => {
	try {
		const owner = req.user._id;
		let { page = 1, limit = 10 } = req.query;
		if (page <= 0) {
			page = 1;
		}
		const skip = (page - 1) * limit;
		res.status(200).json({
			status: "success",
			code: 200,
			data: await Contact.find({ owner }, "-createAt -updateAt", {
				skip,
				limit,
			}).populate("owner", "name email"),
		});
	} catch (error) {
		next(error);
	}
};

const getContactById = async (req, res, next) => {
	try {
		const contact = await Contact.findOne({
			_id: req.params.contactId,
			owner: req.user._id,
		});
		switch (contact) {
			case null:
				res.status(404).json({
					status: "faild",
					code: 404,
					message: "Not found",
				});
				break;
			default:
				res.status(200).json({
					status: "success",
					code: 200,
					data: contact,
				});
				break;
		}
	} catch (error) {
		next(error);
	}
};

const removeContact = async (req, res, next) => {
	try {
		const contact = await Contact.findOneAndRemove({
			_id: req.params.contactId,
			owner: req.user._id,
		});
		if (contact === null) {
			res.status(404).json({
				status: "faild",
				code: 404,
				message: "Not found",
			});
		} else {
			res.status(200).json({
				status: "success",
				code: 200,
				data: contact,
				message: "contact deleted",
			});
		}
	} catch (error) {
		next(error);
	}
};

const addContact = async (req, res, next) => {
	try {
		const validError = contactValidation(req.body, true);
		console.log(validError);
		if (validError.error) {
			res.status(400).json({
				status: "faild",
				code: 400,
				message: validError.error.details[0].message,
			});
		} else {
			//console.log("\n----------------------------------------------------\n");
			//console.log({ ...req.body, owner: req.user_id });
			const contact = await Contact.create({ ...req.body, owner: req.user_id });
			res.status(201).json({
				status: "success",
				code: 201,
				data: contact,
			});
		}
	} catch (error) {
		next(error);
	}
};

const updateContact = async (req, res, next) => {
	try {
		const validError = contactValidation(req.body);
		if (validError.error) {
			res.json({
				body: req.body,
				status: "faild",
				code: 400,
				message: validError.error.details[0].message,
				details: validError,
			});
		} else {
			const contact = await Contact.findOneAndUpdate(
				{ _id: req.params.contactId, owner: req.user._id },
				req.body,
				{
					new: true,
				}
			);
			if (contact === null) {
				res.json({
					status: "faild",
					code: 404,
					message: `Not found`,
					data: contact,
				});
			} else {
				res.json({
					status: "success",
					code: 200,
					data: contact,
				});
			}
		}
	} catch (error) {
		next(error);
	}
};
const updateContactFavorite = async (req, res, next) => {
	try {
		if (req.body.hasOwnProperty("favorite")) {
			const favorite = req.body.favorite;
			req.body = { favorite: favorite };
			//console.log(req.body);
			updateContact(req, res, next);
		} else {
			res.status(400).json({
				status: "faild",
				code: 400,
				message: "missing field favorite",
			});
		}
	} catch (error) {
		next(error);
	}
};
module.exports = {
	listContacts,
	getContactById,
	removeContact,
	addContact,
	updateContact,
	updateContactFavorite,
};
