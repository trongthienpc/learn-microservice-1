import express from "express";
import {
  changePasswordController,
  loginController,
  registerController,
  resetPasswordController,
} from "../controllers/authentication.controller.js";

const authenticationRouter = express.Router();

/**
 * user login route
 */
authenticationRouter.post("/login", loginController);

/**
 * user registration route
 */
authenticationRouter.post("/register", registerController);

/**
 * user reset password route
 */
authenticationRouter.post("/resetpassword", resetPasswordController);

/**
 * user change password route
 */
authenticationRouter.put("/:id/changePassword", changePasswordController);
/**
 * refresh token route
 */

/**
 * user logout route
 */

authenticationRouter.post("/logout", (req, res) => {
  res.clearCookie("refreshToken");
  res.status(200).json({ success: true, message: "Logged out successfully!" });
});

export default authenticationRouter;
