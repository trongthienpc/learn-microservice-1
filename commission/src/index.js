import express from "express";
import cors from "cors";
import compression from "compression";
import { rateLimit } from "express-rate-limit";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import levelRoute from "./routes/level.route.js";
import staffRoute from "./routes/staff.route.js";
import priceRoute from "./routes/price.route.js";
import serviceRoute from "./routes/service.route.js";
import commissionRoute from "./routes/commission.route.js";
import transactionRoute from "./routes/transaction.route.js";
import commissionRateRoute from "./routes/commissionRate.route.js";
import serviceCommissionRoute from "./routes/service-commission.route.js";
import { checkAuthenticated } from "./middleware/jwt.js";
import authenticationRouter from "./routes/authentication.route.js";
import branchRoute from "./routes/branch.route.js";
import departmentRoute from "./routes/department.route.js";
import { initializeCASLAbilityFromDB } from "./middleware/casl.js";

// ROLE IMPORT
import roleRouter from "./routes/role/role.route.js";
import groupRouter from "./routes/role/group.route.js";
import rolePermissionRouter from "./routes/role/rolePermission.route.js";
import permissionRouter from "./routes/role/permission.route.js";
import groupAccountRouter from "./routes/role/groupAccount.route.js";
import roleGroupRouter from "./routes/role/roleGroup.route.js";

dotenv.config();

const app = express();

const whitelist = ["https://phuongchau.com", "http://localhost:5173"];

const createAbility = async (req, res, next) => {
  try {
    if (
      req?.originalUrl?.includes("/login") ||
      req.originalUrl?.includes("/logout") ||
      req?.originalUrl?.includes("/register") ||
      req?.originalUrl?.includes("/refresh")
    ) {
      return next();
    }

    if (req.userId) {
      const ability = await initializeCASLAbilityFromDB(req.userId);
      req.ability = ability;
      next();
    }

    // return res.status(403).json({ message: "FORBIDDEN 3!" });
  } catch (error) {
    console.log("Error creating ability: ", error);
    res.status(500).json({ error: "Internal server error 1" });
  }
};

const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};

const limitOptions = rateLimit({
  max: 100,
  standardHeaders: true,
  windowMs: 10 * 60 * 1000,
});

app.use(limitOptions);

app.use(compression());

// app.use(cors(corsOptions));

app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());

app.use("*", checkAuthenticated);

app.use(createAbility);

/* --- BRANCH - DEPARTMENT --- */
app.use("/api/branch", branchRoute);
app.use("/api/department", departmentRoute);

/* --- PROFILE --- */
app.use("/api/auth", authenticationRouter);
app.use("/api/level", levelRoute);
app.use("/api/staff", staffRoute);

/* --- SERVICES - COMMISSION --- */
app.use("/api/service", serviceRoute);
app.use("/api/price", priceRoute);
app.use("/api/commission", commissionRoute);
app.use("/api/transaction", transactionRoute);
app.use("/api/commissionRate", commissionRateRoute);
app.use("/api/service-commission", serviceCommissionRoute);

/* --- ROLES - PERMISSIONS --- */
app.use("/api/role", roleRouter);
app.use("/api/permission", permissionRouter);
app.use("/api/role-permission", rolePermissionRouter);
app.use("/api/group", groupRouter);
app.use("/api/group-account", groupAccountRouter);
app.use("/api/role-group", roleGroupRouter);

// app.listen(process.env.PORT, () => {
//   console.log("Server listening on port " + process.env.PORT);
// });

export default app;
