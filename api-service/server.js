import "dotenv/config";
import express from "express";
import "express-async-errors";
import { NewPasswordEventFactory, StockResponseEventFactory } from "./Events/index.js";
import { errorHandler } from "./Middlewares/errorMiddleware.js";

import { router } from "./routes/index.js";

const app = express();

app.use(express.json());

app.use(router);

app.use(errorHandler);

app.listen(3001, () => {
  console.log("listening on 3001");
  const newPasswordEvent = NewPasswordEventFactory.createInstance();
  const stockResponseEvent = StockResponseEventFactory.createInstance();

  newPasswordEvent.listenToEvent();
  stockResponseEvent.listenToEvent();
});
