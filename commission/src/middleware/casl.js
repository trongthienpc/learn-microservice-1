import { AbilityBuilder, createMongoAbility } from "@casl/ability";
import prisma from "../libs/prisma.js";

async function fetchRolesAndPermissions(userId) {
  try {
    const users = await prisma.account.findUnique({
      where: {
        id: userId,
      },
      include: {
        groupUsers: {
          include: {
            group: {
              include: {
                groupRole: {
                  include: {
                    role: {
                      include: {
                        rolePermission: {
                          include: {
                            permission: true,
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    });

    const roles = users.groupUsers.flatMap((groupUser) =>
      groupUser.group.groupRole.map((groupRole) => groupRole.role)
    );

    const permissions = users.groupUsers.flatMap((groupUser) =>
      groupUser.group.groupRole.flatMap((groupRole) =>
        groupRole.role.rolePermission.map(
          (rolePermission) => rolePermission.permission
        )
      )
    );

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

export const initializeCASLAbilityFromDB = async (userId) => {
  try {
    const users = await prisma.account.findUnique({
      where: {
        id: userId,
      },
      include: {
        groupUsers: {
          include: {
            group: {
              include: {
                groupRole: {
                  include: {
                    role: {
                      include: {
                        rolePermission: {
                          include: {
                            permission: true,
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    });

    const { can, build } = new AbilityBuilder(createMongoAbility);

    if (users.groupUsers.length === 0) {
      cannot("manage", "all");
    } else {
      users.groupUsers.forEach((groupUser) => {
        groupUser.group.groupRole.forEach((groupRole) => {
          groupRole.role.rolePermission.forEach((rolePermission) => {
            const permission = rolePermission.permission;
            const action = permission.action;
            const resource = permission.resource;
            const fields = permission.fields
              ? permission.fields.split(",")
              : [];
            const conditions = permission.conditions
              ? JSON.parse(permission.conditions)
              : null;
            can(action, resource, fields, {
              ...conditions,
              inverted: permission.inverted,
            });
          });
        });
      });
    }
    const ability = build();
    return ability;
  } catch (error) {
    console.log("Error initializing CASL ability: " + error.message);
    return createMongoAbility([]);
  }
};
