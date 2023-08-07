import { update, create, getAll, getById } from "../services/branch.service.js";
import {
  ACCESS_DENIED,
  BRANCH,
  CREATE,
  FORBIDDEN,
  READ,
  UPDATE,
} from "../utils/constants.js";

export const getBranchById = async (req, res) => {
  if (req.ability.can(READ, BRANCH)) {
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
    return res.status(FORBIDDEN).json({
      success: false,
      message: ACCESS_DENIED,
    });
  }
};

export const getAllBranch = async (req, res) => {
  if (req.ability.can(READ, BRANCH)) {
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
    return res.status(FORBIDDEN).json({
      success: false,
      message: ACCESS_DENIED,
    });
  }
};

export const updateBranch = async (req, res) => {
  const id = req.params.id;
  const isAllow = req.ability.can(UPDATE, BRANCH);

  const data = req.body;

  const userId = req.userId;

  const newData = { ...data, updatedBy: userId };

  if (isAllow) {
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
    return res.status(FORBIDDEN).json({
      success: false,
      message: ACCESS_DENIED,
    });
  }
};

export const createBranch = async (req, res) => {
  try {
    if (req.ability.can(CREATE, BRANCH)) {
      const data = req.body;

      const userId = req.userId;

      const newData = { ...data, createdBy: userId };

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
    res.status(501).json({
      success: false,
      message: error.message,
    });
  }
};
