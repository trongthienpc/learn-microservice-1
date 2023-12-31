import { AbilityBuilder, createMongoAbility } from "@casl/ability";
import prisma from "../libs/prisma.js";
import { redisGet, redisSet } from "./redis.js";

const fetchUserDataFromDB = async (userId) => {
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
    return users;
  } catch (err) {
    console.log("Error fetching user data from database: " + err.message);
    return null;
  }
};

export const initializeCASLAbilityFromData = async (users) => {
  try {
    const { can, build, cannot } = new AbilityBuilder(createMongoAbility);

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
    return build();
  } catch (error) {
    console.log("Error initializing CASL ability 1: " + error.message);
    return null;
  }
};

export const initializeCASLAbilityFromDB = async (userId) => {
  try {
    // check if the data is cached in Redis
    const cachedData = await redisGet(userId);

    if (cachedData) {
      console.log("We loaded cached data");
      const abilityData = JSON.parse(cachedData);

      return await initializeCASLAbilityFromData(abilityData);
    } else {
      const users = await fetchUserDataFromDB(userId);
      if (users) {
        const ability = await initializeCASLAbilityFromData(users);
        await redisSet(`${userId}`, JSON.stringify(users));

        return ability;
      } else {
        // return a default ability if user data is not found in the database
        return createMongoAbility([]);
      }
    }
  } catch (error) {
    console.log("Error initializing CASL ability 2: " + error.message);
    return createMongoAbility([]);
  }
};
