import { Router } from "express";
import { ensureAuthenticated } from "../Middlewares/ensureAuthenticated.js";
import { AuthenticateUserFactory } from "../modules/accounts/useCases/authenticateUser/index.js";
import { CreateUserFactory } from "../modules/accounts/useCases/createUser/index.js";
import { NewPasswordFactory } from "../modules/accounts/useCases/newPassword/index.js";

const userRouter = Router();

const createUserHandler = await CreateUserFactory.createInstance();
const authenticateUserHandler = await AuthenticateUserFactory.createInstance();
const newPasswordHandler = await NewPasswordFactory.createInstance();

userRouter.post("/new", createUserHandler.handle.bind(createUserHandler));

userRouter.post("/login", authenticateUserHandler.handle.bind(authenticateUserHandler));

userRouter.patch(
  "/reset/password",
  ensureAuthenticated,
  newPasswordHandler.handle.bind(newPasswordHandler)
);

export { userRouter };
