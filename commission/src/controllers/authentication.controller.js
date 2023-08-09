import {
  changePassword,
  login,
  register,
  resetPassword,
  sendMail,
} from "../middleware/auth.js";
import { create } from "../services/staff.js";

/**
 * User registration method
 * @param {request} req
 * @param {response} res
 * @returns
 */
export const registerController = async (req, res) => {
  const { username, password, name, address, dateOfBirth, branchId, sex } =
    req.body;

  const data = {
    name: name,
    address: address,
    dateOfBirth: dateOfBirth,
    branchId: branchId,
    sex: sex,
  };

  const newProfile = await create(data);

  const response = await register(username, password, newProfile.data?.id);

  return res.status(200).json(newProfile);
};

/**
 * User login method
 */
export const loginController = async (req, res) => {
  const { username, password } = req.body;

  let response = await login(username, password);

  return res.status(200).json(response);
};

/**
 * User reset password method
 */
export const resetPasswordController = async (req, res) => {
  const { username } = req.body;

  const subject = "Reset Password";

  const response = await resetPassword(username);

  if (response.success) {
    const text = `New password is ${response.data} `;

    try {
      const response = await sendMail(username, subject, text);
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

export const changePasswordController = async (req, res) => {
  const userId = req.userId;
  const { password, newPassword } = req.body;

  try {
    const response = await changePassword(userId, password, newPassword);
    return res.status(200).json({
      success: response.success,
      message: response.message,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
