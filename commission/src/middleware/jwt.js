import jwt from "jsonwebtoken";
import {
  REFRESH_TOKEN_INVALID,
  REFRESH_TOKEN_SUCCESS,
  TOKEN_INVALID,
  TOKEN_SUCCESS,
  UNAUTHORIZED,
} from "../utils/constants.js";
import { initializeCASLAbilityFromDB } from "./casl.js";

/**
 * Generates a JWT token
 * @param {string} userId
 * @returns {string}
 */

export const generateAccessToken = (userId) => {
  const token = jwt.sign({ userId }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: process.env.ACCESS_TOKEN_EXPIRATION_TIME,
  });

  return token;
};

/**
 * generates a JWT token
 * @param {string} userId
 * @returns {string}
 */
export const generateRefreshToken = (userId) => {
  const token = jwt.sign({ userId }, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: process.env.REFRESH_TOKEN_EXPIRATION_TIME,
  });

  return token;
};

/**
 * verifies an token and returns a response object indicating success or failure
 * @param {string} token
 * @returns {object}
 */
export const verifyAccessToken = (token) => {
  try {
    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    return {
      success: true,
      message: TOKEN_SUCCESS,
      decodedToken,
    };
  } catch (error) {
    return {
      success: false,
      message: TOKEN_INVALID,
      error: error.name,
    };
  }
};

/**
 * verifies a refresh token and returns a response object indicating success or failure
 * @param {string} token
 * @returns {object}
 */

export const verifyFreshToken = (token) => {
  try {
    const decodedToken = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
    return {
      success: true,
      message: REFRESH_TOKEN_SUCCESS,
      decodedToken,
    };
  } catch (error) {
    return {
      success: false,
      message: REFRESH_TOKEN_INVALID,
      error: error.name,
    };
  }
};

/**
 * middleware function to check if a request is authenticated
 * @param {object} req
 * @param {object} res
 * @param {function} next
 * @returns
 */
export const checkAuthenticated = async (req, res, next) => {
  if (
    req?.originalUrl?.includes("/login") ||
    req.originalUrl?.includes("/logout") ||
    req?.originalUrl?.includes("/register") ||
    req?.originalUrl?.includes("/refresh")
  ) {
    return next();
  }

  // const token = req.headers.authorization?.split(" ")[1];
  let token = req?.headers.token;

  if (!token) {
    return res.status(UNAUTHORIZED).json({
      success: false,
      message: "Access token not found",
    });
  }

  if (token && token.startsWith("Bearer ")) {
    const accessToken = token.split(" ")[1];
    try {
      jwt.verify(
        accessToken,
        process.env.ACCESS_TOKEN_SECRET,
        async function (err, decoded) {
          if (err) {
            console.log(err);
            return res
              .status(501)
              .json({ success: false, message: err.message });
          } else {
            req.userId = decoded.userId;
            const ability = await initializeCASLAbilityFromDB(req.userId);
            req.ability = ability;
            next();
          }
        }
      );
    } catch (error) {
      return res.status(500).json({ success: false, message: e.message });
    }
  } else {
    return res
      .status(500)
      .json({ success: false, message: "Invalid access token" });
  }
};
