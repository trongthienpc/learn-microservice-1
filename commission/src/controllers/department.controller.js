import {
  create,
  getAll,
  getById,
  update,
} from "../services/department.service.js";

export const getDepartmentById = async (req, res) => {
  if (req.ability.can("read", "department")) {
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
    return {
      success: false,
      message: "Permission denied!",
    };
  }
};

export const getAllDepartment = async (req, res) => {
  if (req.ability.can("read", "department")) {
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
    return res.status(403).json({
      success: false,
      message: "Permission denied!",
    });
  }
};

export const updateDepartment = async (req, res) => {
  const id = req.params.id;
  const isAllow = req.ability.can("update", "department");
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
    return res.status(403).json({
      success: false,
      message: "Permission denied!",
    });
  }
};

export const createDepartment = async (req, res) => {
  try {
    if (req.ability.can("create", "department")) {
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
      return res.status(403).json({
        success: false,
        message: "Permission denied!",
      });
    }
  } catch (error) {
    res.status(501).json({
      success: false,
      message: error.message,
    });
  }
};
