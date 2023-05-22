const { Contact } = require("./contact");

const listContacts = async () => {
	const data = await Contact.find();
	console.log(data);

	return data;
};

const getContactById = async (contactId) => {
	const contact = await Contact.findOne({ _id: contactId });
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
