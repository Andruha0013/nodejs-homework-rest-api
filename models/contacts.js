/const fs = require('fs/promises');

const listContacts = async () => {
  const data = await fs.readFile(contactsPath);
	return JSON.parse(data);
}


const getContactById = async (contactId) => {
  const allContacts = await listContacts();
	return allContacts.find((contact) => contact.id === contactId) || null;
}

const removeContact = async (contactId) => {
  const allContacts = await listContacts();
	const index = allContacts.findIndex((contact) => contact.id === id);
	if (index === -1) {
		return null;
	}
	const [result] = allContacts.splice(index, 1);
	await fs.writeFile(contactsPath, JSON.stringify(allContacts, null, 2));
	return result;
}

const addContact = async (body) => {
  const newRecord = {
		id: nanoid(),
		name: name,
		email: email,
		phone: phone,
	};
	const allContacts = await listContacts();
	allContacts.push(newRecord);
	await fs.writeFile(contactsPath, JSON.stringify(allContacts, null, 2));
	return newRecord;
}

const updateContact = async (contactId, body) => {
  const allContacts = await listContacts();
	const index = allContacts.findIndex((contact) => contact.id === id);
	if (index === -1) {
		return null;
	}
	allContacts[index] = { id, ...data };
	await fs.writeFile(contactsPath, JSON.stringify(allContacts, null, 2));
	return allContacts[index];
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
