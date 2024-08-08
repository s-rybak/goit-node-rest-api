import express from "express";
import controller from "../controllers/contactsControllers.js";
import validateBody from "../helpers/validateBody.js";
import {authUser} from "../middlewares/security.js";

import {
    createContactSchema,
    updateContactSchema,
    updateContactFavoritesSchema,
} from "../schemas/contactsSchemas.js";

const contactsRouter = express.Router();

contactsRouter.get("/", authUser, controller.getAllContacts);

contactsRouter.get("/:id", authUser, controller.getOneContact);

contactsRouter.delete("/:id", authUser, controller.deleteContact);

contactsRouter.post(
    "/",
    authUser,
    validateBody(createContactSchema),
    controller.createContact
);

contactsRouter.put(
    "/:id",
    authUser,
    validateBody(updateContactSchema),
    controller.updateContact
);

contactsRouter.patch(
    "/:id/favorite",
    authUser,
    validateBody(updateContactFavoritesSchema),
    controller.updateContact
);

export default contactsRouter;
