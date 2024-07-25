import fs from "fs/promises";
import path from "path";

const contactsPath = path.resolve("db", "contacts.json");

/**
 * Returns the list of contacts.
 *
 * @returns {Promise<Array>} - The list of contacts
 */
async function listContacts() {
  try {
    const data = await fs.readFile(contactsPath);
    return JSON.parse(data);
  } catch (error) {
    printError(error);
  }
}

/**
 * Returns the contact by id.
 * Or null if contact not found.
 *
 * @param {int} contactId
 * @returns {Promise<Object|null>} - The contact
 */
async function getContactById(contactId) {
  return (await listContacts()).find(({ id }) => id === contactId) ?? null;
}

/**
 * Removes the contact by id.
 * Returns the removed contact.
 *
 * @param {int} contactId
 * @returns
 */
async function removeContact(contactId) {
  const contacts = await listContacts();
  const idx = contacts.findIndex(({ id }) => id === contactId);

  if (idx === -1) {
    return null;
  }

  const [removedContact] = contacts.splice(idx, 1);

  await saveContacts(contacts);
  return removedContact;
}

/**
 * Adds a new contact to the list.
 *
 * @param {Object} contact - The contact to add
 * @returns {Promise<{Object}>} - The new contact
 */
async function addContact(contact) {
  const contacts = await listContacts();
  const id = getNewContactId();
  const newContact = { id, ...contact };
  contacts.push(newContact);
  await saveContacts(contacts);
  return newContact;
}

/**
 * Updates the contact by id.
 * Returns the updated contact.
 * Or null if contact not found.
 * @param {int} contactId
 * @param {Object} contact
 * @returns
 */

async function updateContact(contactId, contact) {
  const contacts = await listContacts();
  const idx = contacts.findIndex(({ id }) => id === contactId);

  if (idx === -1) {
    return null;
  }

  const updatedContact = { ...contacts[idx], ...contact };
  contacts[idx] = updatedContact;

  await saveContacts(contacts);
  return updatedContact;
}

/**
 * Saves the list of contacts.
 *
 * @param {Array<Object>} contacts
 */
async function saveContacts(contacts) {
  try {
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  } catch (error) {
    printError(error);
  }
}

/**
 * Returns id for the new contact.
 *
 * @returns
 */
function getNewContactId() {
  return (new Date().getTime() + Math.random() * 1000)
    .toString(32)
    .replace(".", (Math.random() * 1000).toString(32).replace(".", ""))
    .slice(0, 21);
}

/**
 * Prints an error message to the console.
 * @param {*} error
 */
function printError(error) {
  console.error("\x1B[31m Error: ", error);
}

export {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
