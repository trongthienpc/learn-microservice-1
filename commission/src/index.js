import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import levelRoute from "./routes/level.route.js";
import staffRoute from "./routes/staff.route.js";
import priceRoute from "./routes/price.route.js";
import serviceRoute from "./routes/service.route.js";
import commissionRoute from "./routes/commission.route.js";
import transactionRoute from "./routes/transaction.route.js";
import commissionRateRoute from "./routes/commissionRate.route.js";
import serviceCommissionRoute from "./routes/service-commission.route.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());

app.use("/api/level", levelRoute);
app.use("/api/price", priceRoute);
app.use("/api/staff", staffRoute);
app.use("/api/service", serviceRoute);
app.use("/api/commission", commissionRoute);
app.use("/api/transaction", transactionRoute);
app.use("/api/commissionRate", commissionRateRoute);
app.use("/api/service-commission", serviceCommissionRoute);

app.listen(process.env.PORT, () => {
  console.log("Server listening on port " + process.env.PORT);
});
