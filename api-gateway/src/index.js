import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import cors from "cors";
import proxy from "express-http-proxy";

import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(express.json());

app.use(cors());

app.use(helmet());

app.use(morgan("combined"));

app.use("/api/auth", proxy("http://localhost:5001"));
app.use("/api/inventory", proxy("http://localhost:5002"));
app.use("/api/payment", proxy("http://localhost:5003"));
app.use("/api/product", proxy("http://localhost:5004"));
app.use("/api/shipping", proxy("http://localhost:5005"));

app.listen(process.env.PORT, () => {
  console.log(`Gateway listening on ${process.env.PORT}`);
});
