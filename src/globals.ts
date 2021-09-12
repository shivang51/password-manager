import * as dotenv from "dotenv";
import internal from "stream";

const result = dotenv.config({ path: __dirname + "\\..\\.env" });

if (result.error) {
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

export const env_variables: IEnvVaribles =
  result.parsed as unknown as IEnvVaribles;
