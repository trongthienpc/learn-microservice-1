import {
  create,
  deleteById,
  getAll,
  getById,
  update,
} from "../../services/role/group.service.js";
export const getGroupById = async (req, res) => {
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

export const deleteGroupById = async (req, res) => {
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

export const getAllGroup = async (req, res) => {
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

export const updateGroup = async (req, res) => {
  const id = req.params.id;

  const data = req.body;

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
};

export const createGroup = async (req, res) => {
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
