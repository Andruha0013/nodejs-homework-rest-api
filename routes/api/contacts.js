const express = require("express");
const contacts = require("../../models/contacts");
const { contactValidation } = require("../../validation/contacts");

const router = express.Router();

const fields = ["name", "email", "phone"];

function isEmpty(variable) {
	if (variable == "" || variable === undefined) {
		return true;
	} else {
		return false;
	}
}

router.get("/", async (req, res, next) => {
	res.json({
		status: "success",
		code: 200,
		data: await contacts.listContacts(),
	});
});

router.get("/:contactId", async (req, res, next) => {
	const contact = await contacts.getContactById(req.params.contactId);
	switch (contact) {
		case null:
			res.json({
				status: "faild",
				code: 404,
				message: "Not found",
			});
			break;
		default:
			res.json({
				status: "success",
				code: 200,
				data: contact,
			});
			break;
	}
});

router.post("/", async (req, res, next) => {
	const keys = Object.keys(req.body);

	let undefFields = [];
	fields.forEach((element) => {
		if (keys.includes(element) === false) {
			undefFields.push(element);
		} else {
			if (isEmpty(req.body[element]) === true) {
				undefFields.push(element);
			}
		}
	});
	const validError = contactValidation(req.body);
	if (undefFields.length > 0) {
		res.json({
			status: "faild",
			code: 400,
			message: `missing required field(s) such as: ${undefFields.join()}`,
		});
	} else if (validError) {
		res.json({
			status: "faild",
			code: 400,
			message: "validation error",
			details: validError.error.details,
		});
	} else {
		const contact = await contacts.addContact(req.body);
		res.json({
			status: "success",
			code: 201,
			data: contact,
		});
	}
});

router.delete("/:contactId", async (req, res, next) => {
	const contact = await contacts.removeContact(req.params.contactId);
	if (contact === null) {
		res.json({
			status: "faild",
			code: 404,
			message: "Not found",
		});
	} else {
		res.json({
			status: "success",
			code: 200,
			data: contact,
			message: "contact deleted",
		});
	}
});

router.put("/:contactId", async (req, res, next) => {
	const keys = Object.keys(req.body);
	const validError = contactValidation(req.body);
	let undefFields = [];
	fields.forEach((element) => {
		if (keys.includes(element) === false) {
			undefFields.push(element);
		} else {
			if (isEmpty(req.body[element]) === true) {
				undefFields.push(element);
			}
		}
	});

	if (undefFields.length === fields.length) {
		res.json({
			status: "faild",
			code: 400,
			message: `missing required field(s) such as: ${undefFields.join()}`,
		});
	} else if (validError) {
		res.json({
			status: "faild",
			code: 400,
			message: "validation error",
			details: validError.error.details,
		});
	} else {
		const contact = await contacts.updateContact(
			req.params.contactId,
			req.body
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
});

module.exports = router;
