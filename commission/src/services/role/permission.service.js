import { createRoleGroup } from "../../controllers/role/roleGroup.controller.js";
import prisma from "../../libs/prisma.js";

const checkPermissionExist = async (action, resource) => {
  try {
    const permission = await prisma.permission.findFirst({
      where: {
        action: action,
        resource: resource,
      },
    });
    console.log(permission);
    if (permission) return false;
    return true;
  } catch (err) {
    console.log("Something went wrong! ", err.message);
    return false;
  }
};

export const create = async (data) => {
  const { action, resource } = data;
  const isNotExist = await checkPermissionExist(action, resource);
  if (isNotExist) {
    try {
      const res = await prisma.permission.create({
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
  } else {
    return {
      success: false,
      message: "Permission is existing",
    };
  }
};

export const getAll = async () => {
  try {
    const data = await prisma.permission.findMany({});
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
    const res = await prisma.permission.update({
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
    const res = await prisma.permission.findUnique({
      where: {
        id: id,
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
      const data = await prisma.permission.update({
        where: {
          id: id,
        },
        data: {
          status: false,
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
