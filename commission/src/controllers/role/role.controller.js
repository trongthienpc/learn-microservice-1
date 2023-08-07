import {
  create,
  deleteById,
  getAll,
  getById,
  update,
} from "../../services/role/role.service.js";
export const getRoleById = async (req, res) => {
  if (req.ability.can("read", "role")) {
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

export const deleteRoleById = async (req, res) => {
  if (req.ability.can("delete", "role")) {
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
    return res.status(403).json({ success: false, message: "FORBIDDEN" });
  }
};

export const getAllRole = async (req, res) => {
  if (req.ability.can("read", "role")) {
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
    return res.status(403).json({ success: false, message: "FORBIDDEN" });
  }
};

export const updateRole = async (req, res) => {
  if (req.ability.can("update", "role")) {
    const id = req.params.id;

    const userId = req.userId;

    const data = req.body;

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

export const createRole = async (req, res) => {
  if (req.ability.can("create", "role")) {
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
