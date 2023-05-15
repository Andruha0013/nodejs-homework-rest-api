const express = require("express");
const contacts = require("../../models/contacts");
const { contactValidation, isValidID } = require("../../validation");

const router = express.Router();

router.get("/", async (req, res, next) => {
	res.status(200).json({
		status: "success",
		code: 200,
		data: await contacts.listContacts(),
	});
});

router.get("/:contactId", isValidID, async (req, res, next) => {
	const contact = await contacts.getContactById(req.params.contactId);
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
});

router.post("/", async (req, res, next) => {
	const validError = contactValidation(req.body, true);
	console.log(validError);
	if (validError.error) {
		res.status(400).json({
			status: "faild",
			code: 400,
			message: validError.error.details[0].message,
		});
	} else {
		const contact = await contacts.addContact(req.body);
		res.status(201).json({
			status: "success",
			code: 201,
			data: contact,
		});
	}
});

router.delete("/:contactId", isValidID, async (req, res, next) => {
	const contact = await contacts.removeContact(req.params.contactId);
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
});

router.patch("/:contactId/favorite", isValidID, async (req, res, next) => {
	const validError = contactValidation(req.body);
	if (req.body.hasOwnProperty("favorite")) {
		if (validError.error) {
			res.status(400).json({
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
				res.status(404).json({
					status: "faild",
					code: 404,
					message: `Not found`,
					data: contact,
				});
			} else {
				res.status(200).json({
					status: "success",
					code: 200,
					data: contact,
				});
			}
		}
	} else {
		res.status(400).json({
			status: "faild",
			code: 400,
			message: "missing field favorite",
		});
	}
});

router.put("/:contactId", isValidID, async (req, res, next) => {
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
