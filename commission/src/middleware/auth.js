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
import { generateAccessToken } from "./jwt.js";
import { getTodayISODate } from "../utils/helper.js";
import { createRoleGroup } from "../controllers/role/roleGroup.controller.js";

/**
 * Register a new user with the given email and password
 * @param {string} email - user's email address
 * @param {string} password - user's password
 * @returns {object} response object containing the status, message and token information
 */
export const register = async (username, password, profileId) => {
  try {
    // check if email is already registered
    if (username && password && profileId) {
      const userExists = await prisma.account.findUnique({
        where: {
          email: username,
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
          email: username,
          password: hashedPassword,
          staffId: profileId,
        },
      });

      // generate jwt token
      const token = generateAccessToken(user.id);

      return {
        success: true,
        message: REGISTER_SUCCESS,
        data: user,
      };
    } else {
      return {
        success: false,
        message: "Please fulfill your registration",
      };
    }
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
export const login = async (email, password) => {
  try {
    updateAccountWhenLogin(email);

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

    // get info about this account
    const userInfo = await prisma.staff.findFirst({
      where: {
        account: {
          some: {
            id: user.id,
          },
        },
      },
    });

    updateLastAction(
      user.id,
      "Login to the system at time: " + new Date().toISOString()
    );

    const accessToken = generateAccessToken(user.id);

    return {
      statusCode: 200,
      success: true,
      message: LOGIN_SUCCESS,
      data: { ...userInfo, accessToken },
    };
  } catch (error) {
    console.error(error);
  }
};

const updateAccountWhenLogin = async (email) => {
  const today = getTodayISODate();

  const user = await prisma.account.findUnique({
    where: {
      email: email,
    },
  });
  if (user) {
    const lastLoginDate = user?.lastLoginDate?.toISOString().split("T")[0];
    let dailyLoginCount = user?.dailyLoginCount ?? 0;

    if (lastLoginDate !== today) {
      dailyLoginCount = 1; // reset daily login count
    } else {
      dailyLoginCount += 1; // increment daily login count
    }

    await prisma.account.update({
      where: {
        email: email,
      },
      data: {
        lastLoginDate: new Date(),
        dailyLoginCount: dailyLoginCount,
      },
    });
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

export const changePassword = async (id, oldPassword, newPassword) => {
  try {
    if (!id)
      return {
        success: false,
        message: "Ops! Something went wrong 1! ...",
      };
    const user = await prisma.account.findUnique({
      where: {
        id: id,
      },
    });

    if (!user) {
      return {
        success: false,
        message: "User not found",
      };
    }

    if (oldPassword) {
      const isMatched = await bcrypt.compare(oldPassword, user.password);
      if (!isMatched) {
        return {
          success: false,
          message: "Ops! Something went wrong 2!...",
        };
      }
      const salt = await bcrypt.genSalt(15);
      const newHashedPassword = await bcrypt.hash(newPassword, salt);

      try {
        await prisma.account.update({
          where: {
            id: id,
          },
          data: {
            password: newHashedPassword,
          },
        });

        updateLastPasswordChanged(id);
        updateLastAction(
          id,
          "Change password at time: " + new Date().toISOString()
        );

        return {
          success: true,
          message: "SUCCESS",
        };
      } catch (error) {
        return {
          success: false,
          message: error.message,
        };
      }
    }
  } catch (error) {
    return {
      success: false,
      message: error.message,
    };
  }
};

const updateLastPasswordChanged = async (id) => {
  await prisma.account.update({
    where: {
      id: id,
    },
    data: {
      lastPasswordChanged: new Date(),
    },
  });
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

export const getRoles = async (userId) => {
  try {
    if (userId) {
      const data = await prisma.account.findUnique({
        where: { id: userId },
        select: {
          groupUsers: {
            select: {
              group: {
                select: {
                  groupRole: {
                    select: {
                      role: {
                        select: {
                          id: true,
                          name: true,
                          type: true,
                          status: true,
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      });
      return {
        success: true,
        message: "SUCCESS",
        data: data,
      };
    }
  } catch (err) {
    return {
      success: false,
      message: err.message,
    };
  }
};

export const updateLastAction = async (userId, action) => {
  try {
    await prisma.account.update({
      where: {
        id: userId,
      },
      data: {
        description: action,
      },
    });
  } catch (err) {
    console.log("There was an error updating: ", err.message);
  }
};
