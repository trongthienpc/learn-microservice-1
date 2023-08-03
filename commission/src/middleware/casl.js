import { AbilityBuilder, createMongoAbility } from "@casl/ability";
import prisma from "../libs/prisma.js";

async function fetchRolesAndPermissions() {
  try {
    const roles = await prisma.role.findMany({
      include: {
        rolePermission: {
          include: {
            permission: true,
          },
        },
      },
    });

    const permissions = await prisma.permission.findMany();

    return { roles, permissions };
  } catch (error) {
    console.log(error.message);
    return {
      roles: [],
      permissions: [],
    };
  }
}

const createAbilityFromDB = (roles, permissions) => {
  const { can, rules, cannot, build } = new AbilityBuilder(createMongoAbility);
  console.log(permissions);

  if (permissions.length === 0) {
    cannot("manage", "all");
  }
  roles.forEach((role) => {
    role.rolePermission.forEach((rolePermission) => {
      const permission = permissions.find(
        (p) => p.id === rolePermission.permissionId
      );

      if (permission) {
        const action = permission.action;
        const resource = permission.resource;
        const fields = permission.fields ? permission.fields?.split(",") : [];
        const conditions = permission.conditions
          ? JSON.parse(permission.conditions)
          : null;
        can(action, resource, fields, {
          ...conditions,
          inverted: rolePermission.inverted,
        });
      }
    });
  });

  const ability = build(rules);

  return ability;
};

export const initializeCASLAbilityFromDB = async () => {
  const { roles, permissions } = await fetchRolesAndPermissions();
  return createAbilityFromDB(roles, permissions);
};
