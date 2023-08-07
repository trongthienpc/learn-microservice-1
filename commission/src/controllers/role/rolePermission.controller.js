import {
  create,
  deleteById,
  getAll,
  getById,
} from "../../services/role/rolePermission.service.js";
import {
  ACCESS_DENIED,
  CREATE,
  DELETE,
  FORBIDDEN,
  READ,
  ROLE_PERMISSION,
} from "../../utils/constants.js";

export const getRolePermissionById = async (req, res) => {
  if (req.ability.can(READ, ROLE_PERMISSION)) {
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

export const deleteRolePermissionById = async (req, res) => {
  if (req.ability.can(DELETE, ROLE_PERMISSION))
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
  else {
    return res
      .status(FORBIDDEN)
      .json({ success: false, message: ACCESS_DENIED });
  }
};

export const getAllRolePermission = async (req, res) => {
  if (req.ability.can(READ, ROLE_PERMISSION)) {
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
    // The user is not authorized to read role permission
    res.status(FORBIDDEN).json({ success: false, message: ACCESS_DENIED });
  }
};

export const createRolePermission = async (req, res) => {
  if (req.ability.can(CREATE, ROLE_PERMISSION))
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
  else {
    return res
      .status(FORBIDDEN)
      .json({ success: true, message: ACCESS_DENIED });
  }
};
