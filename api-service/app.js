import "dotenv/config";
import express from "express";
import "express-async-errors";
import { errorHandler } from "./Middlewares/errorMiddleware.js";

import swaggerUI from "swagger-ui-express";
import { router } from "./routes/index.js";
import swaggerFile from "./swagger.json";

const app = express();

app.use(express.json());

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerFile));

app.use(router);

app.use(errorHandler);

export { app };
