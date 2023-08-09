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
    const data = await prisma.service.findMany({
      select: {
        id: true,
        name: true,
        createdAt: true,
        createdBy: true,
        description: true,
        updatedAt: true,
        _count: true,
        commission: {
          orderBy: {
            createdAt: "desc",
          },
          take: 1,
          select: {
            id: true,
            type: true,
            value: true,
          },
        },
        price: {
          orderBy: {
            createdAt: "desc",
          },
          take: 1,
          select: {
            id: true,
            price: true,
          },
        },
      },
    });

    console.log(data[0]);
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
