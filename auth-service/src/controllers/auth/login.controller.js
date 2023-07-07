import { BAD_REQUEST } from "../../utils/constants.js";
import { login as loginService } from "../../middleware/auth.service.js";
export const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(BAD_REQUEST).json({
      success: false,
      message: "Invalid email or password",
    });
  }

  try {
    const response = await loginService({ email, password });

    return res.status(response.statusCode).json({
      success: response.success,
      message: response.message,
      data: response?.data,
    });
  } catch (error) {
    return res.status(BAD_REQUEST).json({
      success: false,
      message: error.message,
    });
  }
};
