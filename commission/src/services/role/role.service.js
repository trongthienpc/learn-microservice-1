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
    const role = await prisma.role.findUnique({
      where: {
        id: id,
      },
      include: {
        groupRole: {
          select: {
            group: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
        rolePermission: {
          select: {
            permission: {
              select: {
                resource: true,
                action: true,
              },
            },
          },
        },
      },
    });

    // const groupHaveRole = role.groupRole.map((groupRole) => groupRole.group);

    // console.log(groupHaveRole);

    return {
      success: true,
      message: "SUCCESS",
      data: role,
    };
  } catch (error) {
    return {
      success: false,
      message: error.message,
    };
  }
};

export const deleteById = async (id, userId) => {
  try {
    if (id) {
      const data = await prisma.role.update({
        where: {
          id: id,
        },
        data: {
          status: false,
          updatedBy: userId,
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
