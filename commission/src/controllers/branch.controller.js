import { update, create, getAll, getById } from "../services/branch.service.js";

export const getBranchById = async (req, res) => {
  if (req.ability.can("read", "branch")) {
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

export const getAllBranch = async (req, res) => {
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
    return res.status(403).json({
      success: false,
      message: "Permission denied!",
    });
  }
};

export const updateBranch = async (req, res) => {
  const id = req.params.id;
  const isAllow = req.ability.can("update", "branch");
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

export const createBranch = async (req, res) => {
  try {
    if (req.ability.can("create", "branch")) {
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
