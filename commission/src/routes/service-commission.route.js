import express from "express";
import {
  getAllServiceCommission,
  getServiceCommissionById,
  createServiceCommission,
} from "../controllers/service-commission.controller.js";

const route = express.Router();

route.get("/", getAllServiceCommission);
route.post("/create", createServiceCommission);
route.get("/:id", getServiceCommissionById);

export default route;
