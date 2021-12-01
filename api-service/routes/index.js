import { Router } from "express";
import { stockRouter } from "./stock.routes.js";
import { userRouter } from "./user.routes.js";

const router = Router();

router.use("/", userRouter);
router.use("/stock", stockRouter);

export { router };
