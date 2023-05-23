const express = require("express");
const contacts = require("../../controllers/contacts");
const { isValidID } = require("../../validation");
const { authenticate } = require("../../midleware");

const router = express.Router();

router.get("/", authenticate, contacts.listContacts);

router.get("/:contactId", authenticate, isValidID, contacts.getContactById);

router.post("/", authenticate, contacts.addContact);

router.delete("/:contactId", authenticate, isValidID, contacts.removeContact);

router.patch(
	"/:contactId/favorite",
	authenticate,
	isValidID,
	contacts.updateContactFavorite
);

router.put("/:contactId", authenticate, isValidID, contacts.updateContact);

module.exports = router;
