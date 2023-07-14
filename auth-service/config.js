import { config } from "dotenv";

if (process.env.NODE_ENV === "development") {
  const configFile = `./.env.dev`;
  config({ path: configFile });
} else {
  config();
}

export const {
  PORT,
  DATABASE_URL,
  ACCESS_TOKEN_SECRET,
  REFRESH_TOKEN_SECRET,
  ACCESS_TOKEN_EXPIRATION_TIME,
  REFRESH_TOKEN_EXPIRATION_TIME,
  MAIL,
  EMAIL_PWD,
} = process.env;
