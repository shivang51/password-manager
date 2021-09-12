import * as dotenv from "dotenv";

const result = dotenv.config({ path: __dirname + "\\..\\.env" });

if (result.error && process.env.GMAIL == undefined) {
  console.error("Failed to parse env variables!");
} else {
  console.info("Successfully parsed env variables 😀");
}

interface IEnvVaribles {
  PORT: string;
  GMAIL: string;
  GMAIL_PASSWORD: string;
  FIREBASE_PRIVATE_KEY: string;
  FIREBASE_PROJECT_ID: string;
  FIREBASE_CLIENT_EMAIL: string;
}

const variables = {
  PORT: process.env.PORT || result.parsed?.PORT,
  GMAIL: process.env.GMAIL || result.parsed?.GMAIL,
  GMAIL_PASSWORD: process.env.GMAIL_PASSWORD || result.parsed?.GMAIL_PASSWORD,
  FIREBASE_PRIVATE_KEY:
    process.env.FIREBASE_PRIVATE_KEY || result.parsed?.FIREBASE_PRIVATE_KEY,
  FIREBASE_PROJECT_ID:
    process.env.FIREBASE_PROJECT_ID || result.parsed?.FIREBASE_PROJECT_ID,
  FIREBASE_CLIENT_EMAIL:
    process.env.FIREBASE_CLIENT_EMAIL || result.parsed?.FIREBASE_CLIENT_EMAIL,
};

export const env_variables: IEnvVaribles = variables as unknown as IEnvVaribles;
