import {
  create,
  deleteById,
  getAll,
  getById,
  update,
} from "../../services/role/permission.service.js";

export const getPermissionById = async (req, res) => {
  if (req.ability.can("read", "permission")) {
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
    return res.status(403).json({ success: false, message: "FORBIDDEN" });
  }
};

export const deletePermissionById = async (req, res) => {
  if (req.ability.can("delete", "permission")) {
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
    return res.status(403).json({ success: false, message: "FORBIDDEN" });
  }
};

export const getAllPermission = async (req, res) => {
  if (req.ability.can("read", "branch")) {
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
    res.status(403).json({ error: "FORBIDDEN" });
  }
};

export const updatePermission = async (req, res) => {
  if (req.ability.can("update", "branch")) {
    const id = req.params.id;

    const data = req.body;

    const userId = req.userId;

    const newData = { ...data, updatedBy: userId };

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
    return res.status(403).json({ success: false, message: "FORBIDDEN" });
  }
};

export const createPermission = async (req, res) => {
  if (req.ability.can("create", "permission")) {
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
    return res.status(403).json({ success: false, message: "FORBIDDEN" });
  }
};
