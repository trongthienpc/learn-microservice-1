import {
  createTransaction,
  getAllTransaction,
  getTransactionById,
  getTransactionByUserId,
} from "../controllers/transaction.controller.js";

import express from "express";

const route = express.Router();

route.get("/", getAllTransaction);
route.post("/create", createTransaction);
route.get("/:id", getTransactionById);
route.get("/userId/:id", getTransactionByUserId);

export default route;
