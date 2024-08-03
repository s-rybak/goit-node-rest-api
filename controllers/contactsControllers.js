import * as contactsService from "../services/contactsServices.js";
import ctrlWrapper from "../helpers/ctrlWrapper.js";
import HttpError from "../helpers/HttpError.js";

const getAllContacts = async (req, res) => {
  res.json(await contactsService.listContacts());
};

const getOneContact = async (req, res) => {
  const contact = await contactsService.getContactById(req.params.id);
  if (!contact) {
    throw HttpError(404);
  }
  res.json(contact);
};

const deleteContact = async (req, res) => {
  const contact = await contactsService.removeContact(req.params.id);
  if (!contact) {
    throw HttpError(404);
  }
  res.json(contact);
};

const createContact = async (req, res) => {
  const newContact = await contactsService.addContact(req.body);
  res.status(201).json(newContact);
};

const updateContact = async (req, res) => {
  const updatedContact = await contactsService.updateContact(
    req.params.id,
    req.body
  );
  if (!updatedContact) {
    throw HttpError(404);
  }
  res.json(updatedContact);
};

const updateStatusContact = async (req, res) => {
  const updatedContact = await contactsService.updateStatusContact(
    req.params.id,
    req.body
  );
  if (!updatedContact) {
    throw HttpError(404);
  }
  res.json(updatedContact);
};

export default {
  getAllContacts: ctrlWrapper(getAllContacts),
  getOneContact: ctrlWrapper(getOneContact),
  deleteContact: ctrlWrapper(deleteContact),
  createContact: ctrlWrapper(createContact),
  updateContact: ctrlWrapper(updateContact),
  updateStatusContact: ctrlWrapper(updateStatusContact),
};
