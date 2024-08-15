import ctrlWrapper from "../helpers/ctrlWrapper.js";
import HttpError from "../helpers/HttpError.js";
import * as usersService from "../services/userServices.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import path from "node:path";
import fs from "node:fs/promises";

const {JWT_SECRET} = process.env;

/**
 * Sign up controller
 * @param {*} req
 * @param {*} res
 */
const signUp = async (req, res) => {
    const user = await usersService.createUser(req.body);
    res.status(201).json({
        user: {
            email: user.email,
            subscription: user.subscription,
            avatarURL: user.avatarURL
        }
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
        throw HttpError(401, "Email or password is wrong");
    }
    const passwordCompare = await bcrypt.compare(password, user.password);
    if (!passwordCompare) {
        throw HttpError(401, "Email or password is wrong");
    }

    const payload = {
        id: user.id,
    };

    const token = jwt.sign(payload, JWT_SECRET, {expiresIn: "24h"});
    usersService.updateUser(user.id, {token});

    res.json({
        token,
        user: {
            email: user.email,
            subscription: user.subscription,
            avatarURL: user.avatarURL,
        }
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
    const {email, subscription,avatarURL} = req.user;
    res.json({
        email,
        subscription,
        avatarURL,
    });
};

/**
 * Update user subscription controller
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
const updateSubscription = async (req, res) => {
    const {id} = req.user;
    const {subscription} = req.body;
    const updatedUser = await usersService.updateUserSubscription(id, subscription);
    res.json({
        email: updatedUser.email,
        subscription: updatedUser.subscription,
    });
}

/**
 * Update user avatar controller
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
const updateAvatar = async (req, res) => {
    const {id} = req.user;
    const {path: oldPath, filename} = req.file;
    const newPath = path.join(path.resolve("public", "avatars"), filename);
    const avatarURL = `/avatars/${filename}`;
    await fs.rename(oldPath, newPath);
    const updatedUser = await usersService.updateUser(id, {avatarURL});
    res.json({
        avatarURL: updatedUser.avatarURL,
    });
}

export default {
    signUp: ctrlWrapper(signUp),
    signIn: ctrlWrapper(signIn),
    signOut: ctrlWrapper(signOut),
    current: ctrlWrapper(current),
    updateSubscription: ctrlWrapper(updateSubscription),
    updateAvatar: ctrlWrapper(updateAvatar),
};
