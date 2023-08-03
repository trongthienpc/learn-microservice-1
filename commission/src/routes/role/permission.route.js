import express from "express";
import {
  createPermission,
  deletePermissionById,
  getAllPermission,
  getPermissionById,
  updatePermission,
} from "../../controllers/role/permission.controller.js";

const route = express.Router();

route.get("/", getAllPermission);
route.post("/create", createPermission);
route.put("/:id", updatePermission);
route.get("/:id", getPermissionById);
route.delete("/:id", deletePermissionById);

export default route;
