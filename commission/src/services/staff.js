import prisma from "../libs/prisma.js";

export const create = async (data) => {
  try {
    const res = await prisma.staff.create({
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
    const data = await prisma.staff.findMany({});
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
    const data = await prisma.staff.findUnique({
      where: {
        id: id,
      },
      select: {
        id: true,
        name: true,
        phone: true,
        sex: true,
        address: true,
        dateOfBirth: true,
        branch: {
          select: {
            id: true,
            name: true,
          },
        },
        account: {
          select: {
            _count: true,
            groupUsers: {
              select: {
                group: {
                  select: {
                    id: true,
                    name: true,
                  },
                },
                account: {
                  select: {
                    id: true,
                    email: true,
                    lastLoginDate: true,
                  },
                },
              },
            },
          },
        },
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
