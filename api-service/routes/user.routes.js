import { Router } from "express";
import { CreateUser } from "../modules/accounts/useCases/createUser/index.js";

const userRouter = Router();

const createUserHandler = await CreateUser();

userRouter.post("/new", createUserHandler.handle.bind(createUserHandler));

export { userRouter };
