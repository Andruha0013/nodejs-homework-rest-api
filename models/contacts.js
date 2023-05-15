const fs = require("fs/promises");
const path = require("path");
const nanoid = require("nanoid");
const { Contact } = require("./contact");

const contactsPath = path.join(__dirname, "contacts.json");

const listContacts = async () => {
	//const data = await fs.readFile(contactsPath);
	const data = await Contact.find();
	console.log(data);
	//return JSON.parse(data);
	return data;
};

const getContactById = async (contactId) => {
	const contact = await Contact.findOne({ _id: contactId });
	//const allContacts = await listContacts();
	//return allContacts.find((contact) => contact.id === contactId) || null;
	return contact;
};

const removeContact = async (contactId) => {
	const result = await Contact.findByIdAndRemove(contactId);
	return result;
};

const addContact = async ({ name, email, phone, favorite }) => {
	const newRecord = {
		name: name,
		email: email,
		phone: phone,
		favorite: favorite,
	};
	const newBdRecord = await Contact.create(newRecord);
	return newBdRecord;
};

const updateContact = async (contactId, data) => {
	const updatedContact = await Contact.findByIdAndUpdate(contactId, data, {
		new: true,
	});
	return updatedContact;
};

module.exports = {
	listContacts,
	getContactById,
	removeContact,
	addContact,
	updateContact,
};
