import { Router } from "express";
import { AuthenticateUser } from "../modules/accounts/useCases/authenticateUser/index.js";
import { CreateUser } from "../modules/accounts/useCases/createUser/index.js";

const userRouter = Router();

const createUserHandler = await CreateUser();

const authenticateUserHandler = await AuthenticateUser();

userRouter.post("/new", createUserHandler.handle.bind(createUserHandler));

userRouter.post("/login", authenticateUserHandler.handle.bind(authenticateUserHandler));

export { userRouter };
