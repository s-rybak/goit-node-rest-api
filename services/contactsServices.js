import Contact from "../db/models/Contact.js";

/**
 * Returns the list of contacts.
 *
 * @returns {Promise<Array>} - The list of contacts
 */
const listContacts = (query, {page = 1, limit = 10}) => Contact.findAll({
    where: query,
    limit,
    offset: (page - 1) * limit
});

/**
 * Returns the contact by query.
 * @param {Object} query
 * @returns {Promise<Contact>}
 */
const findOneContact = (query) => Contact.findOne({
    where: query,
});

/**
 * Removes the contact by query.
 * Returns the removed contact.
 *
 * @param {Object} query
 * @returns
 */
const removeContact = async (query) => {
    const contact = await findOneContact(query);
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
 * @returns {Promise<Contact>} - The new contact
 */
const addContact = (contact) => Contact.create(contact);

/**
 * Updates the contact by query.
 * Returns the updated contact.
 * Or null if contact not found.
 * @param {Object} query
 * @param {Object} contact
 * @returns
 */
const updateContact = async (query, contact) => {
    const [rows, updateContact] = await Contact.update(contact, {
        where: query,
        returning: true,
    });

    return rows ? updateContact[0] : null;
};

/**
 * Updates the contact's favorite status by query.
 * Returns the updated contact.
 *
 * @param {*} query
 * @param {*} contact
 * @returns
 */
const updateStatusContact = async (query, contact) => {
    return await updateContact(query, contact);
};

export {
    listContacts,
    removeContact,
    addContact,
    updateContact,
    updateStatusContact,
    findOneContact
};
