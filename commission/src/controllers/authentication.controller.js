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
  const { email, password, name, address, dateOfBirth, branchId, sex } =
    req.body;

  const response = await register(email, password);

  const user = response.data;

  const data = {
    name: name,
    address: address,
    dateOfBirth: dateOfBirth,
    branchId: branchId,
    sex: sex,
    accountId: user.id,
  };

  const newProfile = await create(data);

  return res.status(200).json(newProfile);
};

/**
 * User login method
 */
export const loginController = async (req, res) => {
  const { email, password } = req.body;

  let response = await login(email, password);

  return res.status(200).json(response);
};

/**
 * User reset password method
 */
export const resetPasswordController = async (req, res) => {
  const { email } = req.body;

  const subject = "Reset Password";

  const response = await resetPassword(email);

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
