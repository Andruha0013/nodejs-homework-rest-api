const fs = require("fs/promises");
const path = require("path");
const nanoid = require("nanoid");

const contactsPath = path.join(__dirname, "contacts.json");

const listContacts = async () => {
	const data = await fs.readFile(contactsPath);
	return JSON.parse(data);
};

const getContactById = async (contactId) => {
	const allContacts = await listContacts();
	return allContacts.find((contact) => contact.id === contactId) || null;
};

const removeContact = async (contactId) => {
	const allContacts = await listContacts();
	const index = allContacts.findIndex((contact) => contact.id === contactId);
	if (index === -1) {
		return null;
	}
	const [result] = allContacts.splice(index, 1);
	await fs.writeFile(contactsPath, JSON.stringify(allContacts, null, 2));
	return result;
};

const addContact = async ({ name, email, phone }) => {
	const newRecord = {
		id: nanoid.nanoid(),
		name: name,
		email: email,
		phone: phone,
	};
	const allContacts = await listContacts();
	allContacts.push(newRecord);
	await fs.writeFile(contactsPath, JSON.stringify(allContacts, null, 2));
	return newRecord;
};

const updateContact = async (contactId, data) => {
	const allContacts = await listContacts();
	const index = allContacts.findIndex((contact) => contact.id === contactId);
	if (index === -1) {
		return null;
	}
	let contact = allContacts[index];
	const keys = {
		dataKeys: Object.keys(data),
		contactKeys: Object.keys(contact),
	};

	keys.dataKeys.forEach((dataKey) => {
		if (keys.contactKeys.includes(dataKey) === true) {
			contact[dataKey] = data[dataKey];
		}
	});

	allContacts[index] = { ...contact };
	await fs.writeFile(contactsPath, JSON.stringify(allContacts, null, 2));
	return allContacts[index];
};

module.exports = {
	listContacts,
	getContactById,
	removeContact,
	addContact,
	updateContact,
};
