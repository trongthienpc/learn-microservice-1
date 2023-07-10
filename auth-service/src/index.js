import express from "express";
import compression from "compression";
import helmet from "helmet";
import morgan from "morgan";
import { PORT } from "../config.js";
import authRouter from "./routes/auth.route.js";
import { checkAuthenticated } from "./middleware/jwt.service.js";

const app = express();

app.use(compression());

app.use(express.json());

app.use(helmet());

app.use(morgan("dev"));

app.use(checkAuthenticated);

// Routes
app.use("/", authRouter);

app.listen(PORT, () => {
  console.log(`Auth service is listening on ${PORT}`);
});
