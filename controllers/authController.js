import ctrlWrapper from "../helpers/ctrlWrapper.js";
import HttpError from "../helpers/HttpError.js";
import * as usersService from "../services/userServices.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const {JWT_SECRET} = process.env;

/**
 * Sign up controller
 * @param {*} req
 * @param {*} res
 */
const signUp = async (req, res) => {
    const user = await usersService.createUser(req.body);
    res.status(201).json({
        id: user.id,
        email: user.email,
        subscription: user.subscription,
    });
};

/**
 * Sign in controller
 * @param {*} req
 * @param {*} res
 */
const signIn = async (req, res) => {

    const {email, password} = req.body;
    const user = await usersService.getByEmail(email);
    if (!user) {
        throw HttpError(401, "Email or password invalid");
    }
    const passwordCompare = await bcrypt.compare(password, user.password);
    if (!passwordCompare) {
        throw HttpError(401, "Email or password invalid");
    }

    const payload = {
        id: user.id,
    };

    const token = jwt.sign(payload, JWT_SECRET, {expiresIn: "24h"});
    usersService.updateUser(user.id, {token});

    res.json({
        token,
    });
};

/**
 * Sign out controller
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
const signOut = async (req, res) => {
    const {id} = req.user;
    await usersService.updateUser(id, {token: null});
    res.status(204).send();
};

/**
 * Current auth user data
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
const current = async (req, res) => {
    const {email, subscription} = req.user;
    res.json({
        email,
        subscription,
    });
};

export default {
    signUp: ctrlWrapper(signUp),
    signIn: ctrlWrapper(signIn),
    signOut: ctrlWrapper(signOut),
    current: ctrlWrapper(current),
};
