import express from "express";
import {
  getAllCommissionRate,
  getCommissionRateById,
  createCommissionRate,
} from "../controllers/commissionRate.controller.js";

const route = express.Router();

route.get("/", getAllCommissionRate);
route.post("/create", createCommissionRate);
route.get("/:id", getCommissionRateById);

export default route;
