import express from "express";
import {
  getAllCommission,
  createCommission,
  getCommissionById,
} from "../controllers/commissions.controller.js";

const route = express.Router();

route.get("/", getAllCommission);
route.post("/create", createCommission);
route.get("/:id", getCommissionById);

export default route;
