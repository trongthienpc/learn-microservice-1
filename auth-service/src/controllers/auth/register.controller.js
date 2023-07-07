import { BAD_REQUEST } from "../../utils/constants.js";
import { register as registerService } from "../../middleware/auth.service.js";

export const register = async (req, res) => {
  const { email, password } = req.body;

  console.log("object :>> ", email, password);

  // validate required parameters
  if (!email || !password) {
    return res.status(BAD_REQUEST).json({
      success: false,
      message: "Invalid email or password",
    });
  }

  // register the user
  try {
    const response = await registerService({ email, password });
    return res.status(200).json({
      success: response.success,
      message: response.message,
      data: response.data,
    });
  } catch (error) {
    console.log(error);
    return res.status(BAD_REQUEST).json({
      success: false,
      message: error.message,
    });
  }
};
