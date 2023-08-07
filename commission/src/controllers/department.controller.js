import {
  create,
  getAll,
  getById,
  update,
} from "../services/department.service.js";
import {
  ACCESS_DENIED,
  CREATE,
  DEPARTMENT,
  FORBIDDEN,
  READ,
  UPDATE,
} from "../utils/constants.js";

export const getDepartmentById = async (req, res) => {
  if (req.ability.can(READ, DEPARTMENT)) {
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
  } else {
    return res.status(FORBIDDEN).json({
      success: false,
      message: ACCESS_DENIED,
    });
  }
};

export const getAllDepartment = async (req, res) => {
  if (req.ability.can(READ, DEPARTMENT)) {
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
  } else {
    return res.status(FORBIDDEN).json({
      success: false,
      message: ACCESS_DENIED,
    });
  }
};

export const updateDepartment = async (req, res) => {
  const id = req.params.id;
  const isAllow = req.ability.can(UPDATE, DEPARTMENT);

  const data = req.body;

  if (isAllow) {
    try {
      const response = await update(id, data);
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
    return res.status(FORBIDDEN).json({
      success: false,
      message: ACCESS_DENIED,
    });
  }
};

export const createDepartment = async (req, res) => {
  try {
    if (req.ability.can(CREATE, DEPARTMENT)) {
      const data = req.body;

      const createdBy = req.userId;

      const newData = { ...data, createdBy };

      const response = await create(newData, req.ability);

      return res.status(200).json({
        success: response.success,
        message: response.message,
        data: response.data,
      });
    } else {
      return res.status(FORBIDDEN).json({
        success: false,
        message: ACCESS_DENIED,
      });
    }
  } catch (error) {
    return res.status(501).json({
      success: false,
      message: error.message,
    });
  }
};
