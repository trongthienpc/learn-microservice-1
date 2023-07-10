import prisma from "../libs/prisma.js";

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
