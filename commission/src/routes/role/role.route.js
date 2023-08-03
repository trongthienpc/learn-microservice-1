import express from "express";
import {
  createRole,
  deleteRoleById,
  getAllRole,
  getRoleById,
  updateRole,
} from "../../controllers/role/role.controller.js";

const route = express.Router();

route.get("/", getAllRole);
route.post("/create", createRole);
route.put("/:id", updateRole);
route.get("/:id", getRoleById);
route.delete("/:id", deleteRoleById);

export default route;
