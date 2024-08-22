import sendEmail from "../helpers/sendMail.js";

const {BASE_URL} = process.env;

export const sendVerifyEmail = (user) => {
    const verifyEmail = {
        to: user.email,
        subject: "Email verification",
        html: `<a target="_blank" href="${BASE_URL}/api/auth/verify/${user.verificationToken}">Click to verify email</a>`,
    };

    return sendEmail(verifyEmail);
}