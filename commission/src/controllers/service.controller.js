import { getRoles } from "../middleware/auth.js";
import { create, getAll, getById } from "../services/services.js";
import {
  ACCESS_DENIED,
  CREATE,
  FORBIDDEN,
  READ,
  SERVICE,
} from "../utils/constants.js";

export const getServiceById = async (req, res) => {
  const isAllow = req.ability.can(READ, SERVICE);
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
      .status(FORBIDDEN)
      .json({ success: false, message: ACCESS_DENIED });
  }
};

export const getAllService = async (req, res) => {
  const isAllow = req.ability.can(READ, SERVICE);
  if (isAllow) {
    try {
      let pageSize = parseInt(req.query?.pageSize) || 10;
      let page = parseInt(req.query?.page) || 1;

      const response = await getAll();

      const r = await getRoles(req.userId);

      if (response && response.data?.length > 0) {
        let totalPages = Math.ceil(response.data.length / pageSize);

        if (page > totalPages) page = totalPages;

        return res.status(200).json({
          success: response.success,
          message: response.message,
          totalServices: response.data.length,
          page: page,
          totalPages: totalPages,
          services: response.data.slice(
            page * pageSize - pageSize,
            page * pageSize
          ),
        });
      }
    } catch (error) {
      res.status(501).json({
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

export const createService = async (req, res) => {
  const isAllow = req.ability.can(CREATE, SERVICE);
  if (isAllow) {
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
  } else {
    return res
      .status(FORBIDDEN)
      .json({ success: false, message: ACCESS_DENIED });
  }
};
