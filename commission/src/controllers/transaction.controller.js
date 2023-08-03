import {
  create,
  getAll,
  getById,
  getByDate,
  getByUserId,
  updateTransactionStatus as updateStatus,
} from "../services/transaction.service.js";

export const getTransactionById = async (req, res) => {
  try {
    const id = req.params.id;
    const userId = req.userId;
    const response = await getById(id, userId);

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

export const getAllTransaction = async (req, res) => {
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

export const createTransaction = async (req, res) => {
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

export const getTransactionsByDate = async (req, res) => {
  const fromDate = req.body.fromDate;
  const toDate = req.body.toDate;

  try {
    const response = await getByDate(fromDate, toDate);

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

export const getTransactionByUserId = async (req, res) => {
  const staffId = req.params.id;

  try {
    const response = await getByUserId(staffId);
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

export const updateTransactionStatus = async (req, res) => {
  console.log("I am updating transaction status");
  try {
    const id = req.params.id;
    const { status } = req.body;

    if (id && status) {
      const response = await updateStatus(id, status);

      return res.status(200).json({
        success: response.success,
        message: response.message,
        data: response.data,
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
