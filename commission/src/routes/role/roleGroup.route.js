import express from "express";
import {
  createRoleGroup,
  deleteRoleGroupById,
  getAllRoleGroup,
  getRoleGroupById,
} from "../../controllers/role/roleGroup.controller.js";

const route = express.Router();

route.get("/", getAllRoleGroup);
route.post("/create", createRoleGroup);
route.get("/:id", getRoleGroupById);
route.delete("/:id", deleteRoleGroupById);

export default route;
