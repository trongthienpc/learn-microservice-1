import prisma from "../../libs/prisma.js";

export const create = async (data) => {
  try {
    const res = await prisma.groupRole.create({
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
    const data = await prisma.groupRole.findMany({
      include: {
        group: true,
        role: true,
      },
    });
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
    const res = await prisma.groupRole.findUnique({
      where: {
        id: id,
      },
      include: {
        group: true,
        role: true,
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
    if (id) {
      const data = await prisma.groupRole.delete({
        where: {
          id: id,
        },
      });

      return { success: true, message: "SUCCESS", data: data };
    }
  } catch (error) {
    return {
      success: false,
      message: error.message,
    };
  }
};
