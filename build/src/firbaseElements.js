"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateOTP = void 0;
/**
 * Generates OTP with required len
 * @param len length of otp default length is `6`
 * @returns Generated otp as string
 */
function generateOTP(len = 6) {
    // Declare a digits variable
    // which stores all digits
    const digits = "0123456789";
    let OTP = "";
    for (let i = 0; i < len; i++) {
        OTP += digits[Math.floor(Math.random() * 10)];
    }
    return OTP;
}
exports.generateOTP = generateOTP;
