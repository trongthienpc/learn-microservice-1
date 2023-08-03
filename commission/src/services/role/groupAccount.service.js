import prisma from "../../libs/prisma.js";

export const create = async (data) => {
  try {
    const res = await prisma.groupAccount.create({
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
    const data = await prisma.groupAccount.findMany({});
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
    const res = await prisma.groupAccount.findUnique({
      where: {
        id: id,
      },
      include: {
        account: true,
        group: true,
      },
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

export const deleteById = async (id) => {
  try {
    const res = await prisma.groupAccount.delete({
      where: {
        id: id,
      },
    });

    return { success: true, message: "SUCCESS", data: res };
  } catch (error) {
    return {
      success: false,
      message: error.message,
    };
  }
};
