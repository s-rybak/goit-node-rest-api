import User from "../db/models/User.js";
import bcrypt from "bcrypt";
import gravatar from "gravatar";

/**
 * Adds a new user to the list.
 *
 * @param {*} user
 * @returns
 */
const createUser = async (user) => {
    try {
        const {password} = user;
        const hashPassword = await bcrypt.hash(password, 10);
        return await User.create({
            ...user,
            avatarURL:gravatar.url(user.email, {s:250}, true),
            password: hashPassword
        });
    } catch (error) {
        if (error.name === "SequelizeUniqueConstraintError") {
            error.message = "Email in use";
        }
        throw error;
    }
};


/**
 * Updates the user by id.
 *
 * @param id
 * @param user
 * @returns {Promise<*|null>}
 */
const updateUser = async (id, user) => {
    const [rows, updateUser] = await User.update(user, {
        where: {
            id,
        },
        returning: true,
    });

    return rows ? updateUser[0] : null;
}

/**
 * Updates the user subscription by id.
 * @param id
 * @param subscription
 * @returns {Promise<*|null>}
 */
const updateUserSubscription = async (id, subscription) => {
    return updateUser(id, {subscription});
}

/**
 * Returns the user by email
 * Or null if user not found.
 *
 * @param {*} email
 * @returns
 */
const getByEmail = (email) => User.findOne({where: {email}});

const getById = (id) => User.findByPk(id);

export {createUser, getByEmail, getById, updateUser, updateUserSubscription};
