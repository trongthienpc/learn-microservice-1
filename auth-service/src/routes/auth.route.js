import express from "express";
import { register } from "../controllers/auth/register.controller.js";
import { login } from "../controllers/auth/login.controller.js";
import {
  getUserById,
  getAllUsers,
} from "../controllers/account/profile.controller.js";
import { checkAuthenticated } from "../middleware/jwt.service.js";

const route = express.Router();

// register routes
route.post("/register", register);
route.post("/login", login);
route.post("/getAll", getAllUsers);
route.get("/profile/:id", getUserById);

export default route;
