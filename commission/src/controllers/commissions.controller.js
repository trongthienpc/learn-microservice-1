import { create, getAll, getById, update } from "../services/commission.js";

export const getCommissionById = async (req, res) => {
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

export const getAllCommission = async (req, res) => {
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
};

export const createCommission = async (req, res) => {
  try {
    const data = req.body;

    const response = await create(data);

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

export const updateCommissions = async (req, res) => {
  try {
    const id = req.params.id;
    const data = req.body;

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
