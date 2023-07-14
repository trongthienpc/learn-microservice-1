import prisma from "../libs/prisma.js";
import { getFirstDateOfMonth, getLastDateOfMonth } from "../utils/helper.js";

export const create = async (data) => {
  try {
    const res = await prisma.transaction.create({
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
    const data = await prisma.transaction.findMany({});
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
    const data = await prisma.transaction.findUnique({
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

export const getByDate = async (fromDate, toDate) => {
  try {
    const data = await prisma.transaction.findMany({
      where: {
        transactionDate: {
          gte: fromDate,
          lte: toDate,
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

export const getByUserId = async (id) => {
  try {
    const data = await prisma.transaction.findMany({
      where: {
        staffId: id,
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

export const updateTransactionStatus = async (id, status) => {
  try {
    // get transaction by id
    const transaction = await prisma.transaction.findUnique({
      where: {
        id: id,
      },
    });

    if (transaction) {
      let earned = 0;

      const serverId = transaction.serviceId;

      // get service information by service id
      const service = await prisma.service.findUnique({
        where: {
          id: serverId,
        },
        include: {
          commission: {
            orderBy: {
              appliedDate: "desc",
            },
            take: 1,
          },
          price: {
            orderBy: {
              appliedDate: "desc",
            },
            take: 1,
          },
        },
      });

      // get commission type of this service
      const commission = service.commission[0];
      const commissionType = commission.type;

      if (commissionType === "fixed") {
        earned = commission.value || 0;
      }

      if (commissionType === "percent") {
        const servicePrice = service.price[0].price;
        earned = servicePrice * commission.value;
      }

      if (commissionType === "target") {
        const theFirstDate = getFirstDateOfMonth(transaction.transactionDate);
        const theLastDate = getLastDateOfMonth(transaction.transactionDate);

        // find list transactions with same service id and was make same user id in period time

        const result = await prisma.transaction.findMany({
          where: {
            status: "accepted",
            staffId: transaction.staffId,
            serviceId: transaction.serviceId,
            transactionDate: {
              gte: theFirstDate,
              lte: transaction.transactionDate,
            },
          },
        });
      }

      const data = await prisma.transaction.update({
        where: {
          id: id,
        },
        data: {
          status: status,
          moneyEarned: earned,
        },
      });

      return {
        success: true,
        message: "SUCCESS",
        data: data,
      };
    }
  } catch (error) {
    return {
      success: false,
      message: error.message,
    };
  }
};
