import express from "express";
import {
  createBranch,
  getAllBranch,
  getBranchById,
  updateBranch,
} from "../controllers/branch.controller.js";

const route = express.Router();

route.get("/", getAllBranch);
route.post("/create", createBranch);
route.put("/:id", updateBranch);
route.get("/:id", getBranchById);

export default route;
