import express from "express";
import {
  getAllLevel,
  createLevel,
  getLevelById,
} from "../controllers/level.controller.js";

const route = express.Router();

route.get("/", getAllLevel);
route.post("/create", createLevel);
route.get("/:id", getLevelById);

export default route;
