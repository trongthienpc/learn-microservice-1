import express from "express";
import {
  createGroupAccount,
  deleteGroupAccountById,
  getAllGroupAccount,
  getGroupAccountById,
} from "../../controllers/role/groupAccount.controller.js";

const route = express.Router();

route.get("/", getAllGroupAccount);
route.post("/create", createGroupAccount);
route.get("/:id", getGroupAccountById);
route.delete("/:id", deleteGroupAccountById);

export default route;
