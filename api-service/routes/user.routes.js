import { Router } from "express";
import { ensureAuthenticated } from "../Middlewares/ensureAuthenticated.js";
import { ensureIsAdmin } from "../Middlewares/ensureIsAdmin.js";
import { AuthenticateUserFactory } from "../modules/accounts/useCases/authenticateUser/index.js";
import { CreateUserFactory } from "../modules/accounts/useCases/createUser/index.js";
import { NewPasswordFactory } from "../modules/accounts/useCases/newPassword/index.js";
import { StockStatusFactory } from "../modules/stock/useCases/stockStatus/index.js";
import { UserHistoryFactory } from "../modules/stock/useCases/userHistory/index.js";

const userRouter = Router();

const createUserHandler = await CreateUserFactory.createInstance();
const authenticateUserHandler = await AuthenticateUserFactory.createInstance();
const newPasswordHandler = await NewPasswordFactory.createInstance();
const userHistoryHandler = await UserHistoryFactory.createInstance();
const stockStatusHandler = await StockStatusFactory.createInstance();

userRouter.post("/register", createUserHandler.handle.bind(createUserHandler));

userRouter.post("/login", authenticateUserHandler.handle.bind(authenticateUserHandler));

userRouter.patch(
  "/users/reset/password",
  ensureAuthenticated,
  newPasswordHandler.handle.bind(newPasswordHandler)
);

userRouter.get("/history", ensureAuthenticated, userHistoryHandler.handle.bind(userHistoryHandler));

userRouter.get(
  "/stats",
  ensureAuthenticated,
  ensureIsAdmin,
  stockStatusHandler.handle.bind(stockStatusHandler)
);

export { userRouter };
