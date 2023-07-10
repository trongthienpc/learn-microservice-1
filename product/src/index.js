import express from "express";
import cors from "cors";
import { rateLimit } from "express-rate-limit";
import helmet from "helmet";
import morgan from "morgan";
import { PORT } from "../config.js";

const limiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 100, // limit each IP address to 100 requests per `windowMs`(here, per 100 req/1m)
  standardHeaders: true,
});

const app = express();

app.use(limiter);

app.use(express.json());

app.use(cors());

app.use(helmet());

app.use(morgan("combined"));

app.listen(PORT, (req, res) => {
  console.log("Product service is listening on port " + PORT);
});
