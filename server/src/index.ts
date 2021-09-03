import express from "express";
import cors from "cors";
import { setroutes } from "./routes";
import { env_variables } from "./globals";

const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

setroutes(app);

const port: number = (Number(env_variables.PORT) as number) || 8080;
app.listen(port, () => {
  console.info("[+]Listening on port:", port);
});
