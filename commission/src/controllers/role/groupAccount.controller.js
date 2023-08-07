import {
  create,
  deleteById,
  getAll,
  getById,
} from "../../services/role/groupAccount.service.js";
import { ACCESS_DENIED, FORBIDDEN } from "../../utils/constants.js";

export const getGroupAccountById = async (req, res) => {
  if (req.ability.can("read", "group-account")) {
    try {
      const id = req.params.id;
      const response = await getById(id);

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
  } else {
    return res
      .status(FORBIDDEN)
      .json({ success: false, message: ACCESS_DENIED });
  }
};

export const deleteGroupAccountById = async (req, res) => {
  if (req.ability.can("delete", "group-account")) {
    try {
      const id = req.params.id;

      const response = await deleteById(id);

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
  } else {
    return res
      .status(FORBIDDEN)
      .json({ success: false, message: ACCESS_DENIED });
  }
};

export const getAllGroupAccount = async (req, res) => {
  if (req.ability.can("read", "group-account")) {
    try {
      const response = await getAll();

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
  } else {
    return res
      .status(FORBIDDEN)
      .json({ success: false, message: ACCESS_DENIED });
  }
};

export const createGroupAccount = async (req, res) => {
  if (req.ability.can("create", "group-account")) {
    try {
      const data = req.body;

      const createdBy = req.userId;

      const newData = { ...data, createdBy };

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
  } else {
    return res
      .status(FORBIDDEN)
      .json({ success: false, message: ACCESS_DENIED });
  }
};
