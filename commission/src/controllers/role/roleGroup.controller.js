import {
  create,
  deleteById,
  getAll,
  getById,
} from "../../services/role/roleGroup.service.js";

export const getRoleGroupById = async (req, res) => {
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

export const deleteRoleGroupById = async (req, res) => {
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

export const getAllRoleGroup = async (req, res) => {
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
    res.status(403).json({ error: "Forbidden 1" });
  }
};

export const createRoleGroup = async (req, res) => {
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
