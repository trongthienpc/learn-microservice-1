import { create, getAll, getById } from "../services/commissionRate.js";

export const getCommissionRateById = async (req, res) => {
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

export const getAllCommissionRate = async (req, res) => {
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

export const createCommissionRate = async (req, res) => {
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
