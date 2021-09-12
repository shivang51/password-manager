import nodemailer from "nodemailer";
import { resolve } from "path/posix";
import { env_variables } from "./globals";



const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true, // true for 465, false for other ports
  auth: {
    user: env_variables.GMAIL, // generated ethereal user
    pass: env_variables.GMAIL_PASSWORD, // generated ethereal password
  },
});

/**
 * 
 * @param email Email of receiver
 * @param otp Otp to send
 * @returns 0 on success and -1 on fail.
 */
export function sendOtp(email: string, otp: string) : Promise<number> {
  return new Promise((resolve) => {
    transporter.sendMail({
      from: '"Raz Password Manager" <no-reply@rpm.com>', // sender address
      to: email, // list of receivers
      subject: "Verification OTP", // Subject line
      text: "", // plain text body
      html: "<p>Your OTP for Raz Password Manager is <b>" + otp + "</b></p>", // html body
    }).then((res) => {
      resolve(0)
    }).catch((err) => {
      console.log(err);
      resolve(-1);
    })
  })

  
}
