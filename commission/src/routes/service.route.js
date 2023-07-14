import express from "express";
import {
  getAllService,
  createService,
  getServiceById,
} from "../controllers/service.controller.js";

const route = express.Router();

route.get("/", getAllService);
route.post("/create", createService);
route.get("/:id", getServiceById);

export default route;
