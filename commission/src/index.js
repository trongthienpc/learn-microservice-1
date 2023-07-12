import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import commissionRoute from "./routes/commission.route.js";
import levelRoute from "./routes/level.route.js";
import transactionRoute from "./routes/transaction.route.js";
import serviceRoute from "./routes/service.route.js";
import staffRoute from "./routes/staff.route.js";

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));

app.use("/api/commission", commissionRoute);
app.use("/api/level", levelRoute);
app.use("/api/service", serviceRoute);
app.use("/api/staff", staffRoute);
app.use("/api/transaction", transactionRoute);

app.listen(process.env.PORT, () => {
  console.log("Server listening on port " + process.env.PORT);
});
