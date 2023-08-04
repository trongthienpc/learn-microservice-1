import { create, getAll, getById } from "../services/services.js";

export const getServiceById = async (req, res) => {
  const isAllow = req.ability.can("read", "service");
  if (isAllow) {
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
    return res
      .status(403)
      .json({ success: false, message: "Permission denied!" });
  }
};

export const getAllService = async (req, res) => {
  const isAllow = req.ability.can("read", "service");
  if (isAllow) {
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
    return res
      .status(403)
      .json({ success: false, message: "Permission denied!" });
  }
};

export const createService = async (req, res) => {
  const isAllow = req.ability.can("create", "service");
  if (isAllow) {
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
  } else {
    return res
      .status(403)
      .json({ success: false, message: "Permission denied!" });
  }
};
