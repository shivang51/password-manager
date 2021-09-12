"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendOtp = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const globals_1 = require("./globals");
const transporter = nodemailer_1.default.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: globals_1.env_variables.GMAIL,
        pass: globals_1.env_variables.GMAIL_PASSWORD, // generated ethereal password
    },
});
/**
 *
 * @param email Email of receiver
 * @param otp Otp to send
 * @returns 0 on success and -1 on fail.
 */
function sendOtp(email, otp) {
    return new Promise((resolve) => {
        transporter.sendMail({
            from: '"Raz Password Manager" <no-reply@rpm.com>',
            to: email,
            subject: "Verification OTP",
            text: "",
            html: "<p>Your OTP for Raz Password Manager is <b>" + otp + "</b></p>", // html body
        }).then((res) => {
            resolve(0);
        }).catch((err) => {
            console.log(err);
            resolve(-1);
        });
    });
}
exports.sendOtp = sendOtp;
