import prisma from "../../libs/prisma.js";

export const create = async (data) => {
  try {
    const res = await prisma.group.create({
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
    const data = await prisma.group.findMany({});
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
    const res = await prisma.group.update({
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
    const res = await prisma.group.findUnique({
      where: {
        id: id,
      },
      include: {
        groupRole: {
          select: {
            role: {
              include: {
                rolePermission: {
                  select: {
                    permission: true,
                  },
                },
              },
            },
          },
        },
        groupUsers: {
          select: {
            account: true,
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
    const res = await prisma.group.update({
      where: {
        id: id,
      },
      data: {
        status: false,
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
