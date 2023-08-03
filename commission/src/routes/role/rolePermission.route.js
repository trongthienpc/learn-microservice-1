import express from "express";
import {
  createRolePermission,
  deleteRolePermissionById,
  getAllRolePermission,
  getRolePermissionById,
} from "../../controllers/role/rolePermission.controller.js";

const route = express.Router();

route.get("/", getAllRolePermission);
route.post("/create", createRolePermission);
route.get("/:id", getRolePermissionById);
route.delete("/:id", deleteRolePermissionById);

export default route;
