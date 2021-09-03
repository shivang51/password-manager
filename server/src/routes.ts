import express from "express";
import { verifyOtp } from "./firebase";

const key: string = "gotoheaven";

verifyOtp("my.dev.acc.051@gmail.com", "728883").then((res) => {
  if (res == 0) {
    console.log("OTP Match");
  } else if (res == 1) {
    console.log("Otp match fail");
  } else {
    console.log("User does not exist");
  }
});

export function setroutes(app: express.Application) {
  app.get("/", async (req, res) => {
    if (req.headers.authorization == "Bearer " + key) {
      res.send("hello");
    } else {
      res.send("Access Denied");
    }
  });
}
