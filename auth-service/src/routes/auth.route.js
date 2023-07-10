import express from "express";
import { register } from "../controllers/auth/register.controller.js";
import { login } from "../controllers/auth/login.controller.js";
import {
  getUserById,
  getAllUsers,
  updateUser,
  resetPassword,
} from "../controllers/account/profile.controller.js";

const route = express.Router();

// register routes
route.post("/register", register);
route.post("/login", login);
route.post("/getAll", getAllUsers);
route.get("/profile/:id", getUserById);
route.post("/update/:id", updateUser);
route.post("/resetPassword", resetPassword);

export default route;
