import express from "express";
import controller from "../controllers/authController.js";
import validateBody from "../helpers/validateBody.js";
import { createUserSchema, loginUserSchema } from "../schemas/userSchemas.js";
import { authUser } from "../middlewares/security.js";

const authRouter = express.Router();

authRouter.post("/register", validateBody(createUserSchema), controller.signUp);

authRouter.post("/login", validateBody(loginUserSchema), controller.signIn);

authRouter.post("/logout", authUser,controller.signOut);

authRouter.get("/current", authUser, controller.current);

export default authRouter;
