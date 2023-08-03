import prisma from "../../libs/prisma.js";

export const create = async (data) => {
  try {
    const res = await prisma.rolePermission.create({
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
    const data = await prisma.rolePermission.findMany({
      include: {
        permission: true,
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
    const res = await prisma.rolePermission.findUnique({
      where: {
        id: id,
      },
      include: {
        permission: true,
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
      const data = await prisma.rolePermission.delete({
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
