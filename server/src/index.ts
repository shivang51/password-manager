import * as dotenv from "dotenv";
const result = dotenv.config({ path: __dirname + "\\..\\.env" });

import express from "express";
import cors from "cors";
import { setroutes } from "./routes";

const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

setroutes(app);

const port: number = (Number(process.env.PORT) as number) || 8080;
app.listen(port, () => {
  console.info("[+]Listening on port:", port);
});
