import { config } from "dotenv";

if (process.env.NODE_ENV === "development") {
  const configFile = "./.env.dev";
  config({ path: configFile });
} else {
  config();
}

export const { DATABASE_URL, MSG_QUEUE_URL, EXCHANGE_NAME, QUEUE_NAME, PORT } =
  process.env;
