import {
  create,
  deleteById,
  getAll,
  getById,
  update,
} from "../../services/role/group.service.js";
import { ACCESS_DENIED, FORBIDDEN } from "../../utils/constants.js";
export const getGroupById = async (req, res) => {
  if (req.ability.can("read", "group")) {
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
    res.status(403).json({ success: false, message: "Access denied!" });
  }
};

export const deleteGroupById = async (req, res) => {
  if (req.ability.can("delete", "group")) {
    try {
      const id = req.params.id;
      const userId = req.userId;

      const response = await deleteById(id, userId);

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

export const getAllGroup = async (req, res) => {
  if (req.ability.can("read", "group")) {
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

export const updateGroup = async (req, res) => {
  if (req.ability.can("update", "group")) {
    const id = req.params.id;

    const data = req.body;

    const userId = req.userId;

    const newData = { ...data, userId };

    try {
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
  } else {
    return res
      .status(FORBIDDEN)
      .json({ success: false, message: ACCESS_DENIED });
  }
};

export const createGroup = async (req, res) => {
  if (req.ability.can("create", "group")) {
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
