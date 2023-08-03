import {
  create,
  deleteById,
  getAll,
  getById,
  update,
} from "../../services/role/permission.service.js";

export const getPermissionById = async (req, res) => {
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
};

export const deletePermissionById = async (req, res) => {
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
};

export const getAllPermission = async (req, res) => {
  // if (req.ability.can("read", "branch")) {
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
  // } else {
  //   // The user is not authorized to read branches
  //   res.status(403).json({ error: "Forbidden 1" });
  // }
};

export const updatePermission = async (req, res) => {
  const id = req.params.id;

  const data = req.body;

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
};

export const createPermission = async (req, res) => {
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
};
