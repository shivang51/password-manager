import nodemailer from "nodemailer";
import { env_variables } from "./globals";

export async function sendOtp(email: string, otp: string) {
  let transporter = nodemailer.createTransport({
    service: "gmail", // true for 465, false for other ports
    auth: {
      user: env_variables.GMAIL, // generated ethereal user
      pass: env_variables.GMAIL_PASSWORD, // generated ethereal password
    },
  });

  let info = await transporter.sendMail({
    from: '"Fred Foo 👻" <foo@example.com>', // sender address
    to: email, // list of receivers
    subject: "Verification OTP", // Subject line
    text: "", // plain text body
    html: "<p>Your OTP for Raz Password Manager is <b>" + otp + "</b></p>", // html body
  });
}
