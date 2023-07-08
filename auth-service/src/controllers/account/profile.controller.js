import {
  getUserById as getById,
  getAllUsers as getAll,
} from "../../middleware/auth.service.js";

export const getUserById = async (req, res) => {
  const id = req.params.id;

  console.log("id :>> ", id);

  if (!id) {
    return res.status(404).send({
      success: false,
      message: "Invalid user id",
    });
  }

  try {
    const response = await getById(id);
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

export const getAllUsers = async (req, res) => {
  try {
    const response = await getAll();

    return res.status(200).json({
      success: response.success,
      message: response.message,
      data: response.data,
    });
  } catch (error) {
    console.log(error);
  }
};
