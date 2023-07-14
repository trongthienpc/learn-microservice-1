import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import dotenv from "dotenv";
import { rateLimit } from "express-rate-limit";
dotenv.config();

import authRouter from "./routes/auth.route.js";
import { checkAuthenticated } from "./middleware/jwt.service.js";

const app = express();

const limiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 10, // 10 requests per 1 minute
  standardHeaders: true,
  handler: async (req, res, next, options) => {
    console.log(req?.userId);
    res.status(options.statusCode).send(options.message);
  },
});

app.use(express.json());

app.use(helmet());

app.use(morgan("dev"));

app.use(checkAuthenticated);

app.use(limiter);

// Routes
app.use("/", authRouter);

app.listen(5001, () => {
  console.log(`Auth service is listening on ${5001}`);
});
