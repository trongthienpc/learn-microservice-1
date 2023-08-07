import {
  create,
  getAll,
  getById,
  getByDate,
  getByUserId,
  updateTransactionStatus as updateStatus,
} from "../services/transaction.service.js";
import {
  ACCESS_DENIED,
  CREATE,
  FORBIDDEN,
  READ,
  TRANSACTION,
  UPDATE,
} from "../utils/constants.js";

export const getTransactionById = async (req, res) => {
  if (req.ability.can(READ, TRANSACTION))
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
      return res.status(501).json({
        success: false,
        message: error.message,
      });
    }
  else {
    return res
      .status(FORBIDDEN)
      .json({ success: false, message: ACCESS_DENIED });
  }
};

export const getAllTransaction = async (req, res) => {
  if (req.ability.can(READ, TRANSACTION))
    try {
      const response = await getAll();

      return res.status(200).json({
        success: response.success,
        message: response.message,
        data: response.data,
      });
    } catch (error) {
      return res.status(501).json({
        success: false,
        message: error.message,
      });
    }
  else {
    return res
      .status(FORBIDDEN)
      .json({ success: false, message: ACCESS_DENIED });
  }
};

export const createTransaction = async (req, res) => {
  if (req.ability.can(CREATE, TRANSACTION))
    try {
      const data = req.body;

      const userId = req.userId;

      const newData = { ...data, createdBy: userId };

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
  else {
    return res
      .status(FORBIDDEN)
      .json({ success: false, message: ACCESS_DENIED });
  }
};

export const getTransactionsByDate = async (req, res) => {
  if (req.ability.can(READ, TRANSACTION)) {
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
  } else {
    return res
      .status(FORBIDDEN)
      .json({ success: false, message: ACCESS_DENIED });
  }
};

export const getTransactionByUserId = async (req, res) => {
  if (req.ability.can(READ, TRANSACTION)) {
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
  } else {
    return res
      .status(FORBIDDEN)
      .json({ success: false, message: ACCESS_DENIED });
  }
};

export const updateTransactionStatus = async (req, res) => {
  if (req.ability.can(UPDATE, TRANSACTION))
    try {
      const id = req.params.id;

      const { status } = req.body;

      const data = {
        status: req.body,
        updatedBy: req.userId,
      };

      if (id && status) {
        const response = await updateStatus(id, data);

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
  else {
    return res
      .status(FORBIDDEN)
      .json({ success: false, message: ACCESS_DENIED });
  }
};
