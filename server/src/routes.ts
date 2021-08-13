import express from "express";
import { getallentries } from "./firebase";

const key: string = "gotoheaven";

export function setroutes(app: express.Application) {
  app.get("/", async (req, res) => {
    if (req.headers.authorization == "Bearer " + key) {
      let entries: FirebaseFirestore.DocumentData[] = await getallentries();
      res.send(entries);
    } else {
      res.send("Access Denied");
    }
  });
}
