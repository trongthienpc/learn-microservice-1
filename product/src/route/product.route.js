import express from "express";

import { getAll, create, getById } from "../controllers/product.controller.js";

const route = express.Router();

route.get("/", getAll);

route.post("/create", create);

route.get("/:id", getById);

export default route;
