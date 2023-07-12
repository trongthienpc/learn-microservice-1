import prisma from "../libs/prisma.js";

export const create = async (data) => {
  try {
    const res = await prisma.service.create({
      data: data,
    });

    return {
      success: true,
      message: "SUCCESS",
      data: res,
    };
  } catch (error) {
    return {
      success: false,
      message: error.message,
    };
  }
};

export const getAll = async () => {
  try {
    const data = await prisma.service.findMany({});
    return {
      success: true,
      message: "SUCCESS",
      data: data,
    };
  } catch (error) {
    return { success: false, message: error.message };
  }
};

export const getById = async (id) => {
  try {
    const data = await prisma.service.findUnique({
      where: {
        id: id,
      },
    });

    return {
      success: true,
      message: "SUCCESS",
      data: data,
    };
  } catch (error) {
    return {
      success: false,
      message: error.message,
    };
  }
};
