import { create, getAll, getById, update } from "../services/commission.js";
import {
  ACCESS_DENIED,
  COMMISSION,
  CREATE,
  FORBIDDEN,
  READ,
  UPDATE,
} from "../utils/constants.js";

export const getCommissionById = async (req, res) => {
  if (req.ability.can(READ, COMMISSION))
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

export const getAllCommission = async (req, res) => {
  if (req.ability.can(READ, COMMISSION))
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

export const createCommission = async (req, res) => {
  if (req.ability.can(CREATE, COMMISSION))
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

export const updateCommissions = async (req, res) => {
  if (req.ability.can(UPDATE, COMMISSION))
    try {
      const id = req.params.id;

      const data = req.body;

      const userId = req.userId;

      const newData = { ...data, updatedBy: userId };

      const response = await update(id, newData);

      return res.status(200).json({
        success: response.success,
        message: response.message,
        data: response.data,
      });
    } catch (error) {
      return res.status(500).json({
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
