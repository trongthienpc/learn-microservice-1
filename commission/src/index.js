import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import { route } from "./routes/index.js";
import commissionRoute from "./routes/commission.route.js";

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));

app.use("api/commission", commissionRoute);
app.use("api/level", route.levelRoute);
app.use("api/service", route.serviceRoute);
app.use("api/staff", route.staffRoute);
app.use("api/transaction", route.transactionRoute);

app.listen(process.env.PORT, () => {
  console.log("Server listening on port " + process.env.PORT);
});
