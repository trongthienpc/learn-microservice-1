import {
  createTransaction,
  getAllTransaction,
  getTransactionById,
} from "../controllers/transaction.controller.js";

import express from "express";

const route = express.Router();

route.get("/", getAllTransaction);
route.post("/create", createTransaction);
route.get("/:id", getTransactionById);

export default route;
