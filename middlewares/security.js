import jwt from "jsonwebtoken";
import * as usersService from "../services/userServices.js";
import HttpError from "../helpers/HttpError.js";

const {JWT_SECRET} = process.env;

export const authUser = async (req, res, next) => {
    const {authorization} = req.headers;
    if (!authorization) {
        return next(HttpError(401, "Authorization header is missing"));
    }
    const [type, token] = authorization.split(" ");

    if (type !== "Bearer") {
        return next(HttpError(401, "Bearer is missing"));
    }

    try {
        const payload = jwt.verify(token, JWT_SECRET);

        if (!payload || !payload.id) {
            return next(HttpError(401, "Not authorized"));
        }

        const user = await usersService.getById(payload.id);

        if (!user || user.token !== token) {
            return next(HttpError(401, "Not authorized"));
        }

        req.user = user;
        next();

    } catch (err) {
        return next(HttpError(401, "Not authorized"));
    }


};
