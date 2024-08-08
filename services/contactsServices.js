import Contact from "../db/models/Contact.js";

/**
 * Returns the list of contacts.
 *
 * @returns {Promise<Array>} - The list of contacts
 */
const listContacts = () => Contact.findAll();

/**
 * Returns the contact by id.
 * Or null if contact not found.
 *
 * @param {int} contactId
 * @returns {Promise<Object|null>} - The contact
 */
const getContactById = (contactId) => Contact.findByPk(contactId);

/**
 * Removes the contact by id.
 * Returns the removed contact.
 *
 * @param {int} contactId
 * @returns
 */
const removeContact = async (contactId) => {
  const contact = await getContactById(contactId);
  if (!contact) {
    return null;
  }

  await contact.destroy();
  return contact;
};

/**
 * Adds a new contact to the list.
 *
 * @param {Object} contact - The contact to add
 * @returns {Promise<{Object}>} - The new contact
 */
const addContact = (contact) => Contact.create(contact);

/**
 * Updates the contact by id.
 * Returns the updated contact.
 * Or null if contact not found.
 * @param {int} contactId
 * @param {Object} contact
 * @returns
 */
const updateContact = async (contactId, contact) => {
  const [rows, updateContact] = await Contact.update(contact, {
    where: {
      id: contactId,
    },
    returning: true,
  });

  return rows ? updateContact[0] : null;
};

/**
 * Updates the contact's favorite status by id.
 * Returns the updated contact.
 *
 * @param {*} contactId
 * @param {*} contact
 * @returns
 */
const updateStatusContact = async (contactId, contact) => {
  return await updateContact(contactId, contact);
};

export {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact,
};
