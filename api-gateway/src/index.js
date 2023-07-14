import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import cors from "cors";
import proxy from "express-http-proxy";
import { rateLimit } from "express-rate-limit";
import { addIP, checkIP } from "./middleware/ip.controller.js";
import dotenv from "dotenv";

dotenv.config();

const app = express();

const limiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 100, // limit each IP to 100 requests per `windowMs`(here, per 1 minute)
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  keyGenerator: (req) => {
    return req.headers["x-client-id"];
  },
  handler: async (req, response, next, options) => {
    const ip = req.ip;
    const url = req.originalUrl;
    const times = options.windowMs;
    console.log(options);

    await addIP(ip, url, times);

    response.status(options.statusCode).send(options.message);
  },
  // handler: (request, response, next, options) =>
  //   response.status(options.statusCode).send(options.message),
});

app.use(checkIP);

app.use(limiter);

app.use(express.json());

app.use(cors());

app.use(helmet());

app.use(morgan("combined"));

app.use("/api/auth", proxy("http://localhost:5001"));
app.use("/api/inventory", proxy("http://localhost:5002"));
app.use("/api/payment", proxy("http://localhost:5003"));
app.use("/api/product", proxy("http://localhost:5004"));
app.use("/api/shipping", proxy("http://localhost:5005"));

app.get("/", (req, res) => {
  return res.send("Welcome to the api gateway!");
});

app.listen(process.env.PORT, () => {
  console.log(`Gateway listening on ${process.env.PORT}`);
});
