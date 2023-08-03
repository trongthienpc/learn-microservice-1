import prisma from "../../libs/prisma.js";

export const create = async (data) => {
  try {
    const res = await prisma.role.create({
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
    const data = await prisma.role.findMany({});
    return {
      success: true,
      message: "SUCCESS",
      data: data,
    };
  } catch (error) {
    return { success: false, message: error.message };
  }
};

export const update = async (id, data) => {
  try {
    const res = await prisma.role.update({
      where: {
        id: id,
      },
      data: data,
    });

    return {
      success: true,
      message: "SUCCESS",
      data: res,
    };
  } catch (error) {
    return { success: false, message: error.message };
  }
};

export const getById = async (id) => {
  try {
    const res = await prisma.role.findUnique({
      where: {
        id: id,
      },
      include: {
        group: true,
        rolePermission: {
          include: {
            permission: true,
            role: true,
          },
        },
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
      const data = await prisma.role.update({
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
