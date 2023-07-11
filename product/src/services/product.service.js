import prisma from "../libs/prisma.js";

/**
 *
 * @param {object} prod
 * @returns {object}
 */
export const createProduct = async (prod) => {
  try {
    const response = await prisma.product.create({
      data: prod,
    });

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

/**
 *
 * @returns all products
 */
export const getAllProducts = async () => {
  try {
    const response = await prisma.product.findMany({});
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

/**
 *
 * @param {string} id
 * @returns {object}
 */
export const getById = async (id) => {
  try {
    const response = await prisma.product.findUnique({
      where: {
        id: id,
      },
    });

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
