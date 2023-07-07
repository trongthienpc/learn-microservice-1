import prisma from "../libs/prisma.js";

export const addIP = async (data) => {
  try {
    const isExist = await prisma.blockedIP.findFirst({
      where: {
        ip: data.ip,
      },
    });

    console.log("isExist :>> ", isExist);

    if (!isExist) {
      const response = await prisma.blockedIP.create({
        data: data,
      });

      return {
        success: true,
        message: "SUCCESS",
        data: response,
      };
    }
  } catch (error) {
    console.log("error :>> ", error);
    return {
      success: false,
      message: "ERROR",
    };
  }
};

export const checkIP = async (ip) => {
  if (ip) {
    try {
      const blockedIP = await prisma.blockedIP.findFirst({
        where: {
          ip: ip,
        },
      });

      if (blockedIP != null) {
        return {
          isBlocked: true,
          message: "BLOCKED",
          data: blockedIP,
        };
      } else {
        return {
          isBlocked: false,
        };
      }
    } catch (error) {
      return {
        success: false,
        message: "ERROR",
      };
    }
  }
};
