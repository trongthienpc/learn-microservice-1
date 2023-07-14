import {
  createStaff,
  getAllStaff,
  getStaffById,
} from "../controllers/staff.controller.js";

import express from "express";

const route = express.Router();

route.get("/", getAllStaff);
route.post("/create", createStaff);
route.get("/:id", getStaffById);

export default route;
