import jwt from "jsonwebtoken";
export const checkAuthenticated = (req, res, next) => {
  if (
    req?.originalUrl?.includes("/login") ||
    req.originalUrl?.includes("/logout") ||
    req?.originalUrl?.includes("/register") ||
    req?.originalUrl?.includes("/refresh")
  ) {
    return next();
  }

  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(UNAUTHORIZED).json({
      success: false,
      message: "Access token not found",
    });
  }

  try {
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, function (err, decoded) {
      if (err) {
        console.log(err);
        return res.status(501).json({ success: false, message: err.message });
      } else {
        req.userId = decoded.userId;
        next();
      }
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: e.message });
  }
};
