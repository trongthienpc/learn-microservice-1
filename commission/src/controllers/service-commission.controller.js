import { create, getAll, getById } from "../services/service-commission.js";
import {
  ACCESS_DENIED,
  CREATE,
  FORBIDDEN,
  READ,
  SERVICE_COMMISSION,
} from "../utils/constants.js";

export const getServiceCommissionById = async (req, res) => {
  if (req.ability.can(READ, SERVICE_COMMISSION))
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

export const getAllServiceCommission = async (req, res) => {
  if (req.ability.can(READ, SERVICE_COMMISSION))
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

export const createServiceCommission = async (req, res) => {
  if (req.ability.can(CREATE, SERVICE_COMMISSION))
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
