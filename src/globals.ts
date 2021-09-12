import * as dotenv from "dotenv";
import internal from "stream";

const result = dotenv.config({ path: __dirname + "\\..\\.env" });

if (result.error || !process.env) {
  console.error("Failed to parse env variables!");
} else {
  console.info("Successfully parsed env variables 😀");
}

interface IEnvVaribles {
  PORT: string;
  FIREBASE_ADMIN_KEY: string;
  GMAIL: string;
  GMAIL_PASSWORD: string;
}

console.log(process.env.GMAIL);

const variables = {
  PORT: 8080 || result.parsed?.PORT,
  FIREBASE_ADMIN_KEY:
    process.env.FIREBASE_ADMIN_KEY || result.parsed?.FIREBASE_ADMIN_KEY,
  GMAIL: process.env.GMAIL || result.parsed?.GMAIL,
  GMAIL_PASSWORD: process.env.GMAIL_PASSWORD || result.parsed?.GMAIL_PASSWORD,
};

export const env_variables: IEnvVaribles = variables as unknown as IEnvVaribles;
