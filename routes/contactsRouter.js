import express from "express";
import controller from "../controllers/contactsControllers.js";

import validateBody from "../helpers/validateBody.js";

import {
  createContactSchema,
  updateContactSchema,
  updateContactFavoritesSchema,
} from "../schemas/contactsSchemas.js";

const contactsRouter = express.Router();

contactsRouter.get("/", controller.getAllContacts);

contactsRouter.get("/:id", controller.getOneContact);

contactsRouter.delete("/:id", controller.deleteContact);

contactsRouter.post(
  "/",
  validateBody(createContactSchema),
  controller.createContact
);

contactsRouter.put(
  "/:id",
  validateBody(updateContactSchema),
  controller.updateContact
);

contactsRouter.put(
  "/:id/favorite",
  validateBody(updateContactFavoritesSchema),
  controller.updateContact
);

export default contactsRouter;
