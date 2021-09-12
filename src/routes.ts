import express from "express";
import * as Firebase from "./firebase";
import * as ServerElements from "./serverElements";

const key: string = "gotoheaven";

const mainroutes = express.Router();

mainroutes.get("/", async (req, res) => {
  if (req.headers.authorization == key) {
    res.send("hello");
  } else {
    res.send("Access Denied");
  }
});

mainroutes.post("/registeruser", async (req, res) => {
  if (req.headers.authorization == key) {
    const body: ServerElements.ICUReqBody = req.body;
    const status = await Firebase.signup(body.gmail, body.password);
    res.send(status.toString());
  } else {
    res.send("Access Denied");
  }
});

mainroutes.post("/verifyotp", async (req, res) => {
  if (req.headers.authorization == key) {
    const body: ServerElements.IVerifyOTP = req.body;
    const status = await Firebase.verifyOtp(body.gmail, body.otp);
    res.send(status.toString());
  } else {
    res.send("Access Denied");
  }
});

export = mainroutes;
