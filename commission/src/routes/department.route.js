import express from "express";
import {
  createDepartment,
  getAllDepartment,
  getDepartmentById,
  updateDepartment,
} from "../controllers/department.controller.js";

const route = express.Router();

route.get("/", getAllDepartment);
route.post("/create", createDepartment);
route.put("/:id", updateDepartment);
route.get("/:id", getDepartmentById);

export default route;
