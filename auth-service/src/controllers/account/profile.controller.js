import {
  getUserById as getById,
  getAllUsers as getAll,
  updateUser as update,
  resetPassword as reset,
  sendMail,
} from "../../middleware/auth.service.js";

export const getUserById = async (req, res) => {
  const id = req.params.id;

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

export const updateUser = async (req, res) => {
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
    console.log(error);
  }
};

export const resetPassword = async (req, res) => {
  const email = req.body.email;

  const subject = "Reset Password";

  const response = await reset(email);

  if (response.success) {
    const text = `New password is ${response.data} `;

    try {
      const response = await sendMail(email, subject, text);
      console.log("response", response);
      return res.status(200).json({
        success: response.success,
        message: response.message,
      });
    } catch (error) {
      console.log(error.message);
      return res.status(501).json({
        success: false,
        message: error.message,
      });
    }
  } else {
    return res.status(501).json({
      success: response.success,
      message: response.message,
    });
  }
};
