import nodemailer from "nodemailer";
import prisma from "../libs/prisma.js";
import {
  LOGIN_INVALID,
  LOGIN_INVALID_CODE,
  LOGIN_SUCCESS,
  REGISTER_DUPLICATE_EMAIL,
  REGISTER_SUCCESS,
} from "../utils/constants.js";
import bcrypt from "bcrypt";
import { generateAccessToken } from "./jwt.service.js";

/**
 * Register a new user with the given email and password
 * @param {string} email - user's email address
 * @param {string} password - user's password
 * @returns {object} response object containing the status, message and token information
 */
export const register = async ({ email, password }) => {
  try {
    // check if email is already registered
    const userExists = await prisma.account.findUnique({
      where: {
        email: email,
      },
    });

    if (userExists) {
      return {
        success: false,
        message: REGISTER_DUPLICATE_EMAIL,
      };
    }

    // else create new user
    const salt = await bcrypt.genSalt(15);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await prisma.account.create({
      data: {
        email,
        password: hashedPassword,
      },
    });

    // generate jwt token
    const token = generateAccessToken(user._id);

    return {
      success: true,
      message: REGISTER_SUCCESS,
      data: token,
    };
  } catch (err) {
    console.log(err);
  }
};

/**
 * Logins the user with the given email and password
 * @param {string} email - user's email address
 * @param {string} password - user's password
 * @returns {object} Response object containing the status code, message and token information
 */
export const login = async ({ email, password }) => {
  try {
    const user = await prisma.account.findUnique({
      where: {
        email: email,
      },
    });

    if (!user) {
      return {
        statusCode: LOGIN_INVALID_CODE,
        success: false,
        message: LOGIN_INVALID,
      };
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return {
        statusCode: LOGIN_INVALID_CODE,
        success: false,
        message: LOGIN_INVALID,
      };
    }

    const accessToken = generateAccessToken(user.id);

    return {
      statusCode: 200,
      success: true,
      message: LOGIN_SUCCESS,
      data: accessToken,
    };
  } catch (error) {
    console.error(error);
  }
};

/**
 * Return the user's profile information
 * @param {string } userId - ID of the user
 * @returns {object}
 */
export const getUserById = async (userId) => {
  try {
    const user = await prisma.account.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) {
      return {
        success: false,
        message: "NOT_FOUND",
      };
    } else {
      return {
        success: true,
        message: "SUCCESS",
        data: user,
      };
    }
  } catch (error) {
    return {
      success: false,
      message: "ERROR",
      data: null,
    };
  }
};

/**
 * return list of users
 * @returns {Array}
 */
export const getAllUsers = async () => {
  try {
    const users = await prisma.account.findMany({});
    return {
      success: true,
      message: "SUCCESS",
      data: users,
    };
  } catch (error) {
    return {
      success: false,
      message: "ERROR",
    };
  }
};

/**
 * Update user info by id
 * @param {string} id
 * @param {object} user
 * @returns {object}
 */
export const updateUser = async (id, user) => {
  try {
    const password = user?.password;

    if (password) {
      const salt = await bcrypt.genSalt(15);
      const hashedPassword = await bcrypt.hash(password, salt);
      user.password = hashedPassword;
    }

    const response = await prisma.account.update({
      where: {
        id: id,
      },
      data: user,
    });

    if (!response)
      return {
        success: false,
        message: "User not found",
      };

    return {
      success: true,
      message: "SUCCESS",
      data: response,
    };
  } catch (error) {
    return {
      success: false,
      message: error.message,
    };
  }
};

export const resetPassword = async (email) => {
  try {
    const salt = await bcrypt.genSalt(15);
    console.log(salt);
    const hashPassword = await bcrypt.hash(salt, salt);

    await prisma.account.update({
      where: {
        email: email,
      },
      data: {
        password: hashPassword,
      },
    });

    return {
      success: true,
      message: "Reset Password Success",
      data: salt,
    };
  } catch (error) {
    return {
      success: false,
      message: "Email not found or invalid",
    };
  }
};

export const sendMail = async (recipient, subject, text) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.MAIL,
      pass: process.env.EMAIL_PWD,
    },
  });

  const mailOptions = {
    from: process.env.MAIL,
    to: recipient,
    subject: subject,
    text: text,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent:", info.response);
    return {
      success: true,
      message: "SUCCESS",
    };
  } catch (err) {
    console.log(err);
    return {
      success: false,
      message: "FAILED",
    };
  }
};
