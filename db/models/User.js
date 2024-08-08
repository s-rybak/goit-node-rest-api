import {DataTypes} from "sequelize";
import sequelize from "../sequelize.js";
import {emailRegex} from "../../constants/constants.js";

const User = sequelize.define("users", {
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            is: emailRegex,
        }
    },
    subscription: {
        type: DataTypes.ENUM,
        values: ["starter", "pro", "business"],
        defaultValue: "starter",
    },
    token: {
        type: DataTypes.STRING,
        defaultValue: null,
    },
});

//User.sync({ force: true });

export default User;
