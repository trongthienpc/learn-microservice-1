import { create, getAll, getById } from "../services/service-commission.js";

export const getServiceCommissionById = async (req, res) => {
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

export const getAllServiceCommission = async (req, res) => {
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

export const createServiceCommission = async (req, res) => {
  try {
    const data = req.body;

    console.log(data);

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
