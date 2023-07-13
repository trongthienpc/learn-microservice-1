import express from "express";
import {
  getAllPrice,
  getPriceById,
  createPrice,
} from "../controllers/price.controller.js";

const route = express.Router();

route.get("/", getAllPrice);
route.post("/create", createPrice);
route.get("/:id", getPriceById);

export default route;
