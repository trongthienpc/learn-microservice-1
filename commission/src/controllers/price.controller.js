import { create, getAll, getById } from "../services/price.js";
import {
  ACCESS_DENIED,
  CREATE,
  FORBIDDEN,
  PRICE,
  READ,
} from "../utils/constants.js";

export const getPriceById = async (req, res) => {
  if (req.ability.can(READ, PRICE))
    try {
      const id = req.params.id;
      const response = await getById(id);

      return res.status(200).json({
        success: response.success,
        message: response.message,
        data: response.data,
      });
    } catch (error) {
      return res.status(501).json({
        success: false,
        message: error.message,
      });
    }
  else {
    res.status(FORBIDDEN).json({ success: true, message: ACCESS_DENIED });
  }
};

export const getAllPrice = async (req, res) => {
  if (req.ability.can(READ, PRICE))
    try {
      const response = await getAll();

      return res.status(200).json({
        success: response.success,
        message: response.message,
        data: response.data,
      });
    } catch (error) {
      return res.status(501).json({
        success: false,
        message: error.message,
      });
    }
  else {
    return res
      .status(FORBIDDEN)
      .json({ success: false, message: ACCESS_DENIED });
  }
};

export const createPrice = async (req, res) => {
  if (req.ability.can(CREATE, PRICE))
    try {
      const data = req.body;

      const userId = req.userId;

      const newData = { ...data, createdBy: userId };

      const response = await create(newData);

      return res.status(200).json({
        success: response.success,
        message: response.message,
        data: response.data,
      });
    } catch (error) {
      res.status(501).json({
        success: false,
        message: error.message,
      });
    }
  else {
    return res
      .status(FORBIDDEN)
      .json({ success: false, message: ACCESS_DENIED });
  }
};
