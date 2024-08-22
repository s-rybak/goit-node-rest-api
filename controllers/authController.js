import ctrlWrapper from "../helpers/ctrlWrapper.js";
import HttpError from "../helpers/HttpError.js";
import * as usersService from "../services/userServices.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import path from "node:path";
import fs from "node:fs/promises";
import {sendVerifyEmail} from "../services/emailServices.js";

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
 * Verify email controller
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
const verifyEmail = async (req, res) => {
    const {verificationToken} = req.params;
    const user = await usersService.getByVerificationToken(verificationToken);
    if (!user) {
        throw HttpError(404, "User not found or already verified");
    }

    await usersService.updateUser(user.id, {
        verify: true,
        verificationToken: null,
    });

    res.json({
        message: "Email verified success"
    });

}

/**
 * Resend verification email controller
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
const resendVerificationEmail = async (req, res) => {
    const {email} = req.body;
    const user = await usersService.getByEmail(email);
    if (!user) {
        throw HttpError(404, "User not found");
    }

    if (user.verify) {
        throw HttpError(400, "Email already verified");
    }

    sendVerifyEmail(user);

    res.json({
        message: "Verification email was resent successfully"
    })
}

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
    if (!user.verify) {
        throw HttpError(401, "Email is not verified");
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
    const {email, subscription, avatarURL} = req.user;
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
    verifyEmail: ctrlWrapper(verifyEmail),
    resendVerificationEmail: ctrlWrapper(resendVerificationEmail),
};
