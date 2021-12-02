import "dotenv/config";
import express from "express";
import "express-async-errors";
import { NewPasswordEventFactory, StockResponseEventFactory } from "./Events/index.js";
import { errorHandler } from "./Middlewares/errorMiddleware.js";

import swaggerUI from "swagger-ui-express";
import { router } from "./routes/index.js";
import swaggerFile from "./swagger.json";

const port = process.env.PORT || 3001;

const app = express();

app.use(express.json());

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerFile));

app.use(router);

app.use(errorHandler);

app.listen(port, () => {
  console.log(`listening on ${port}`);
  const newPasswordEvent = NewPasswordEventFactory.createInstance();
  const stockResponseEvent = StockResponseEventFactory.createInstance();

  newPasswordEvent.listenToEvent();
  stockResponseEvent.listenToEvent();
});
