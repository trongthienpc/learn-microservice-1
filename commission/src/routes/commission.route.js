import express from "express";
import {
  getAllCommission,
  createCommission,
  getCommissionById,
  updateCommissions,
} from "../controllers/commissions.controller.js";

const route = express.Router();

route.get("/", getAllCommission);
route.post("/create", createCommission);
route.get("/:id", getCommissionById);
route.put("/:id", updateCommissions);

export default route;
