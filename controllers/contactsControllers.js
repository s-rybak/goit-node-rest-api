import * as contactsService from "../services/contactsServices.js";
import ctrlWrapper from "../helpers/ctrlWrapper.js";
import HttpError from "../helpers/HttpError.js";

const getAllContacts = async (req, res) => {
    const query = {
        owner: req.user.id,
    };

    if(typeof req.query.favorite !== "undefined") {
        query.favorite = req.query.favorite;
    }

    res.json(await contactsService.listContacts(query, {
        page: Number(req.query.page ?? 1),
        limit: Number(req.query.limit ?? 10)
    }));
};

const getOneContact = async (req, res) => {
    const contact = await contactsService.findOneContact({
        id: req.params.id,
        owner: req.user.id
    });
    if (!contact) {
        throw HttpError(404);
    }
    res.json(contact);
};

const deleteContact = async (req, res) => {
    const contact = await contactsService.removeContact({
        id: req.params.id,
        owner: req.user.id
    });
    if (!contact) {
        throw HttpError(404);
    }
    res.json(contact);
};

const createContact = async (req, res) => {
    const newContact = await contactsService.addContact({
        ...req.body,
        owner: req.user.id
    });
    res.status(201).json(newContact);
};

const updateContact = async (req, res) => {
    const updatedContact = await contactsService.updateContact(
        {
            id: req.params.id,
            owner: req.user.id
        },
        req.body
    );
    if (!updatedContact) {
        throw HttpError(404);
    }
    res.json(updatedContact);
};

const updateStatusContact = async (req, res) => {
    const updatedContact = await contactsService.updateStatusContact(
        {
            id: req.params.id,
            owner: req.user.id
        },
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
