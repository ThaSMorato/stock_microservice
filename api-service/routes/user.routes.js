import { Router } from "express";
import { AuthenticateUserFactory } from "../modules/accounts/useCases/authenticateUser/index.js";
import { CreateUserFactory } from "../modules/accounts/useCases/createUser/index.js";

const userRouter = Router();

const createUserHandler = await CreateUserFactory.createInstance();

const authenticateUserHandler = await AuthenticateUserFactory.createInstance();

userRouter.post("/new", createUserHandler.handle.bind(createUserHandler));

userRouter.post("/login", authenticateUserHandler.handle.bind(authenticateUserHandler));

export { userRouter };
