import express from "express";
import controller from "../controllers/authController.js";
import validateBody from "../helpers/validateBody.js";
import {createUserSchema, loginUserSchema, updateUserSubscription} from "../schemas/userSchemas.js";
import {authUser} from "../middlewares/security.js";
import upload from "../middlewares/upload.js";

const authRouter = express.Router();

authRouter.post("/register", validateBody(createUserSchema), controller.signUp);

authRouter.post("/login", validateBody(loginUserSchema), controller.signIn);

authRouter.post("/logout", authUser, controller.signOut);

authRouter.get("/current", authUser, controller.current);

authRouter.patch("/subscription", authUser, validateBody(updateUserSubscription), controller.updateSubscription);

authRouter.patch("/avatars", authUser, upload.single("avatar"), controller.updateAvatar);

export default authRouter;
