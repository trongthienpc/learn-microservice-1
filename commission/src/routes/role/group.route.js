import express from "express";
import {
  createGroup,
  deleteGroupById,
  getAllGroup,
  getGroupById,
  updateGroup,
} from "../../controllers/role/group.controller.js";

const route = express.Router();

route.get("/", getAllGroup);
route.post("/create", createGroup);
route.put("/:id", updateGroup);
route.get("/:id", getGroupById);
route.delete("/:id", deleteGroupById);

export default route;
