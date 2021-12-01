import { Router } from "express";
import { ensureAuthenticated } from "../Middlewares/ensureAuthenticated.js";
import { FindStockByIdFactory } from "../modules/stock/useCases/findStockById/index.js";

const stockRouter = Router();

const findStockByIdHandler = FindStockByIdFactory.createInstance();

stockRouter.use(ensureAuthenticated);

stockRouter.get("/", findStockByIdHandler.handle.bind(findStockByIdHandler));

export { stockRouter };
