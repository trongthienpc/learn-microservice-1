import { create, getAll, getById } from "../services/level.js";
import {
  ACCESS_DENIED,
  CREATE,
  FORBIDDEN,
  LEVEL,
  READ,
} from "../utils/constants.js";

export const getLevelById = async (req, res) => {
  if (req.ability.can(READ, LEVEL))
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
    return res
      .status(FORBIDDEN)
      .json({ success: false, message: ACCESS_DENIED });
  }
};

export const getAllLevel = async (req, res) => {
  if (req.ability.can(READ, LEVEL))
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

export const createLevel = async (req, res) => {
  if (req.ability.can(CREATE, LEVEL))
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
