import {
  create,
  deleteById,
  getAll,
  getById,
} from "../../services/role/roleGroup.service.js";
import { ACCESS_DENIED, FORBIDDEN } from "../../utils/constants.js";

export const getRoleGroupById = async (req, res) => {
  if (req.ability.can("read", "group-role")) {
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

export const deleteRoleGroupById = async (req, res) => {
  if (req.ability.can("delete", "group-role")) {
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

export const getAllRoleGroup = async (req, res) => {
  if (req.ability.can("read", "group-role")) {
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
    // The user is not authorized to read branches
    res.status(FORBIDDEN).json({ error: ACCESS_DENIED });
  }
};

export const createRoleGroup = async (req, res) => {
  if (req.ability.can("create", "group-role")) {
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
    res.status(FORBIDDEN).json({ error: ACCESS_DENIED });
  }
};
