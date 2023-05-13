const express = require("express");
const contacts = require("../../models/contacts");
const { contactValidation } = require("../../validation/contacts");

const router = express.Router();

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
	const validError = contactValidation(req.body, true);
	if (validError) {
		res.json({
			status: "faild",
			code: 400,
			message: validError.error.details[0].message,
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
